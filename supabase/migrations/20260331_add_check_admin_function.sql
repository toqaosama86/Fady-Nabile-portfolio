-- This migration is SUPERSEDED by 20260331114943_256760ae-9107-479c-b322-a66d805f372c.sql
-- The function definition has been moved there with proper schema qualification.
-- Keeping this file for reference only - it will not be applied.

-- [OLD - DO NOT USE - See newer migration for current implementation]
-- ORIGINAL CONTENT BELOW:
/*
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = $1 AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION is_admin(UUID) TO authenticated;

CREATE INDEX IF NOT EXISTS idx_admin_users_user_id_active ON admin_users(user_id) 
WHERE is_active = true;

DROP POLICY IF EXISTS "admin_users_admin_only" ON admin_users;

CREATE POLICY "admin_users_verify_self" ON admin_users FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IN (SELECT user_id FROM admin_users WHERE is_active = true));

CREATE POLICY "admin_users_admin_modify" ON admin_users FOR INSERT, UPDATE, DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users WHERE is_active = true));
*/
