-- RightsGuard Database Schema
-- This file contains the complete database schema for the RightsGuard application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farcaster_id TEXT UNIQUE,
    wallet_address TEXT UNIQUE,
    preferred_state VARCHAR(2) NOT NULL,
    preferred_language VARCHAR(2) NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'es')),
    registered_contacts TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rights guides table
CREATE TABLE rights_guides (
    guide_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    state VARCHAR(2) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    language VARCHAR(2) NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'es')),
    scenario TEXT NOT NULL,
    price INTEGER NOT NULL DEFAULT 99, -- Price in cents
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(state, scenario, language)
);

-- Session logs table
CREATE TABLE session_logs (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    location JSONB, -- {latitude: number, longitude: number, address?: string}
    audio_recording_url TEXT,
    shared_card_url TEXT,
    incident_type TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scenario scripts table
CREATE TABLE scenario_scripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scenario TEXT NOT NULL,
    language VARCHAR(2) NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'es')),
    script TEXT NOT NULL,
    context TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('traffic_stop', 'questioning', 'search', 'arrest', 'general')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(scenario, language)
);

-- Shareable cards table
CREATE TABLE shareable_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_log_id UUID NOT NULL REFERENCES session_logs(log_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    card_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User purchases table (for tracking what users have purchased)
CREATE TABLE user_purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    guide_id UUID REFERENCES rights_guides(guide_id) ON DELETE CASCADE,
    product_type TEXT NOT NULL CHECK (product_type IN ('single_guide', 'full_access', 'incident_recording')),
    stripe_payment_intent_id TEXT NOT NULL,
    amount INTEGER NOT NULL, -- Amount in cents
    currency VARCHAR(3) NOT NULL DEFAULT 'usd',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency contacts table
CREATE TABLE emergency_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    relationship TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_users_farcaster_id ON users(farcaster_id);
CREATE INDEX idx_users_wallet_address ON users(wallet_address);
CREATE INDEX idx_users_preferred_state ON users(preferred_state);

CREATE INDEX idx_rights_guides_state ON rights_guides(state);
CREATE INDEX idx_rights_guides_language ON rights_guides(language);
CREATE INDEX idx_rights_guides_scenario ON rights_guides(scenario);

CREATE INDEX idx_session_logs_user_id ON session_logs(user_id);
CREATE INDEX idx_session_logs_start_time ON session_logs(start_time);
CREATE INDEX idx_session_logs_status ON session_logs(status);

CREATE INDEX idx_scenario_scripts_scenario ON scenario_scripts(scenario);
CREATE INDEX idx_scenario_scripts_language ON scenario_scripts(language);
CREATE INDEX idx_scenario_scripts_category ON scenario_scripts(category);

CREATE INDEX idx_shareable_cards_session_log_id ON shareable_cards(session_log_id);

CREATE INDEX idx_user_purchases_user_id ON user_purchases(user_id);
CREATE INDEX idx_user_purchases_guide_id ON user_purchases(guide_id);
CREATE INDEX idx_user_purchases_status ON user_purchases(status);

CREATE INDEX idx_emergency_contacts_user_id ON emergency_contacts(user_id);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rights_guides_updated_at BEFORE UPDATE ON rights_guides
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_session_logs_updated_at BEFORE UPDATE ON session_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scenario_scripts_updated_at BEFORE UPDATE ON scenario_scripts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shareable_cards_updated_at BEFORE UPDATE ON shareable_cards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_purchases_updated_at BEFORE UPDATE ON user_purchases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_emergency_contacts_updated_at BEFORE UPDATE ON emergency_contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE shareable_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;

-- RLS policies for users table
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid()::text = user_id::text);

-- RLS policies for session_logs table
CREATE POLICY "Users can view their own session logs" ON session_logs
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own session logs" ON session_logs
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own session logs" ON session_logs
    FOR UPDATE USING (auth.uid()::text = user_id::text);

-- RLS policies for user_purchases table
CREATE POLICY "Users can view their own purchases" ON user_purchases
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own purchases" ON user_purchases
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- RLS policies for emergency_contacts table
CREATE POLICY "Users can manage their own emergency contacts" ON emergency_contacts
    FOR ALL USING (auth.uid()::text = user_id::text);

-- Insert some sample data for development
INSERT INTO scenario_scripts (scenario, language, script, context, category) VALUES
('traffic_stop', 'en', 'I am exercising my right to remain silent. I do not consent to any searches. Am I free to go?', 'What to say during a traffic stop', 'traffic_stop'),
('traffic_stop', 'es', 'Estoy ejerciendo mi derecho a permanecer en silencio. No consiento ningún registro. ¿Soy libre de irme?', 'Qué decir durante una parada de tráfico', 'traffic_stop'),
('questioning', 'en', 'I am invoking my Fifth Amendment right to remain silent and my Sixth Amendment right to an attorney.', 'When being questioned by police', 'questioning'),
('questioning', 'es', 'Estoy invocando mi derecho de la Quinta Enmienda a permanecer en silencio y mi derecho de la Sexta Enmienda a un abogado.', 'Cuando la policía te interroga', 'questioning'),
('search', 'en', 'I do not consent to this search. I am exercising my Fourth Amendment rights.', 'When police want to search you or your property', 'search'),
('search', 'es', 'No consiento este registro. Estoy ejerciendo mis derechos de la Cuarta Enmienda.', 'Cuando la policía quiere registrarte a ti o tu propiedad', 'search'),
('arrest', 'en', 'I am invoking my right to remain silent and I want to speak to a lawyer immediately.', 'What to say if you are being arrested', 'arrest'),
('arrest', 'es', 'Estoy invocando mi derecho a permanecer en silencio y quiero hablar con un abogado inmediatamente.', 'Qué decir si te están arrestando', 'arrest');

-- Create a function to check if user has purchased a guide
CREATE OR REPLACE FUNCTION user_has_purchased_guide(p_user_id UUID, p_guide_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_purchases 
        WHERE user_id = p_user_id 
        AND (guide_id = p_guide_id OR product_type = 'full_access')
        AND status = 'completed'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
