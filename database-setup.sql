-- Birthday Website Database Setup
-- Run this in Supabase SQL Editor

-- 1. Hero Section Table
CREATE TABLE IF NOT EXISTS hero_section (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert initial hero data
INSERT INTO hero_section (title, subtitle, image_url) 
VALUES ('Happy Birthday My Love', 'আজকের দিনটি শুধু তোমার জন্য', 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1920')
ON CONFLICT DO NOTHING;

-- 2. Timeline Table
CREATE TABLE IF NOT EXISTS timeline (
    id SERIAL PRIMARY KEY,
    event_date DATE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sample timeline data
INSERT INTO timeline (event_date, title, description, image_url) 
VALUES 
('2023-01-15', 'First Meet', 'যেদিন প্রথম দেখা হয়েছিল', 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800'),
('2023-06-20', 'First Date', 'আমাদের প্রথম ডেট', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800')
ON CONFLICT DO NOTHING;

-- 3. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sample gallery data
INSERT INTO gallery (image_url, caption) 
VALUES 
('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600', 'Beautiful Memory 1'),
('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600', 'Beautiful Memory 2'),
('https://images.unsplash.com/photo-1519741497674-611481863552?w=600', 'Beautiful Memory 3')
ON CONFLICT DO NOTHING;

-- 4. Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    author TEXT DEFAULT 'Me',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sample messages
INSERT INTO messages (message) 
VALUES 
('তুমি আমার জীবনের সবচেয়ে সুন্দর অধ্যায়'),
('তোমার হাসি আমার দিন আলোকিত করে'),
('তুমি ছাড়া আমার জীবন অসম্পূর্ণ'),
('প্রতিটি মুহূর্ত তোমার সাথে বিশেষ')
ON CONFLICT DO NOTHING;

-- 5. Memory Game Table
CREATE TABLE IF NOT EXISTS memory_game (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (Optional but recommended)
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_game ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access" ON hero_section FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON timeline FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON messages FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON memory_game FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert" ON hero_section FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update" ON hero_section FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON timeline FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON gallery FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON messages FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON memory_game FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON memory_game FOR DELETE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON timeline FOR DELETE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON gallery FOR DELETE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON messages FOR DELETE TO authenticated USING (true);
