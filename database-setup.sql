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

-- 6. Settings Table (for music and other configs)
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default music settings
INSERT INTO settings (key, value) VALUES 
('music_level_0', 'assets/music/romantic-track.mp3'),
('music_level_1', 'assets/music/romantic-track.mp3'),
('music_level_2', 'assets/music/romantic-track.mp3'),
('music_level_3', 'assets/music/romantic-track.mp3'),
('music_level_4', 'assets/music/romantic-track.mp3'),
('music_level_5', 'assets/music/romantic-track.mp3'),
('music_level_6', 'assets/music/romantic-track.mp3'),
('music_level_7', 'assets/music/romantic-track.mp3'),
('music_level_8', 'assets/music/romantic-track.mp3'),
('music_level_9', 'assets/music/romantic-track.mp3'),
('music_level_10', 'assets/music/romantic-track.mp3'),
('secret_code', '1205'),
('gift_message', 'আলমারির ওপরের ড্রয়ারে তোমার আসল গিফটটা আছে! ❤️')
ON CONFLICT (key) DO NOTHING;

-- 7. Quiz Questions Table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    correct_option TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sample quiz questions
INSERT INTO quiz_questions (question, option_a, option_b, option_c, correct_option) VALUES 
('আমাদের প্রথম দেখা কোথায় হয়েছিল?', 'ক্যাফেতে', 'পার্কে', 'কলেজে', 'c'),
('আমার প্রিয় রঙ কোনটি?', 'লাল', 'নীল', 'গোলাপী', 'b'),
('আমরা প্রথম কোন মুভি একসাথে দেখেছিলাম?', 'রোমান্টিক', 'অ্যাকশন', 'কমেডি', 'a')
ON CONFLICT DO NOTHING;

-- 8. Bucket List Table
CREATE TABLE IF NOT EXISTS bucket_list (
    id SERIAL PRIMARY KEY,
    task_name TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sample bucket list items
INSERT INTO bucket_list (task_name, is_completed) VALUES 
('প্যারিসে ঘুরতে যাওয়া', false),
('একসাথে সূর্যোদয় দেখা', false),
('একটি বাড়ি কেনা', false)
ON CONFLICT DO NOTHING;

-- 9. Balloon Messages Table
CREATE TABLE IF NOT EXISTS balloon_messages (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sample balloon messages
INSERT INTO balloon_messages (message) VALUES 
('I Love You! ❤️'),
('You are my Sunshine ☀️'),
('My Queen 👑'),
('Always Yours 💍'),
('You are Beautiful! ✨'),
('Forever Together 💕'),
('You Complete Me 🌟'),
('My Everything 💖')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (Optional but recommended)
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_game ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bucket_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE balloon_messages ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access" ON hero_section FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON timeline FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON messages FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON memory_game FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON quiz_questions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON bucket_list FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON balloon_messages FOR SELECT USING (true);

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
CREATE POLICY "Allow authenticated update" ON settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON settings FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON quiz_questions FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON quiz_questions FOR DELETE TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON bucket_list FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON bucket_list FOR DELETE TO authenticated USING (true);
CREATE POLICY "Allow authenticated update" ON bucket_list FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON balloon_messages FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON balloon_messages FOR DELETE TO authenticated USING (true);
