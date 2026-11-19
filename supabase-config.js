const SUPABASE_URL = "https://krcvzwvpizfthwqpqwax.supabase.co/rest/v1/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyY3Z6d3ZwaXpmdGh3cXBxd2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwNjc4NzIsImV4cCI6MjExMDY0Mzg3Mn0.lgnoYI-5R1cVOl8iH1pESaqVSmWfGa3aflDOKKgEvVw";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
