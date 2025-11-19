-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_es TEXT NOT NULL,
  name_de TEXT NOT NULL,
  name_it TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_es TEXT NOT NULL,
  description_de TEXT NOT NULL,
  description_it TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  composition_fr TEXT,
  composition_en TEXT,
  composition_es TEXT,
  composition_de TEXT,
  composition_it TEXT,
  sizes TEXT[] DEFAULT ARRAY['XS', 'S', 'M', 'L', 'XL'],
  colors TEXT[] DEFAULT ARRAY['Noir', 'Blanc'],
  images TEXT[] NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  stock INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create cart table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  session_id TEXT,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create wishlist table
CREATE TABLE IF NOT EXISTS wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  session_id TEXT,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_new ON products(is_new);
CREATE INDEX IF NOT EXISTS idx_cart_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_session ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON wishlist_items(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_session ON wishlist_items(session_id);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Products are readable by everyone
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Cart policies
CREATE POLICY "Users can view their own cart" ON cart_items
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (user_id IS NULL AND session_id = current_setting('app.session_id', true))
  );

CREATE POLICY "Users can insert to their own cart" ON cart_items
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR 
    (user_id IS NULL AND session_id = current_setting('app.session_id', true))
  );

CREATE POLICY "Users can update their own cart" ON cart_items
  FOR UPDATE USING (
    auth.uid() = user_id OR 
    (user_id IS NULL AND session_id = current_setting('app.session_id', true))
  );

CREATE POLICY "Users can delete from their own cart" ON cart_items
  FOR DELETE USING (
    auth.uid() = user_id OR 
    (user_id IS NULL AND session_id = current_setting('app.session_id', true))
  );

-- Wishlist policies (same pattern as cart)
CREATE POLICY "Users can view their own wishlist" ON wishlist_items
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (user_id IS NULL AND session_id = current_setting('app.session_id', true))
  );

CREATE POLICY "Users can insert to their own wishlist" ON wishlist_items
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR 
    (user_id IS NULL AND session_id = current_setting('app.session_id', true))
  );

CREATE POLICY "Users can delete from their own wishlist" ON wishlist_items
  FOR DELETE USING (
    auth.uid() = user_id OR 
    (user_id IS NULL AND session_id = current_setting('app.session_id', true))
  );
