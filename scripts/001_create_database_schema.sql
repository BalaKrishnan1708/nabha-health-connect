-- Create users profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('patient', 'doctor', 'pharmacy')),
  specialization TEXT, -- for doctors
  license_number TEXT, -- for doctors and pharmacies
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create doctors table for additional doctor info
CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  specialization TEXT NOT NULL,
  experience_years INTEGER,
  consultation_fee DECIMAL(10,2),
  available_days TEXT[], -- array of days
  available_hours JSONB, -- {start: "09:00", end: "17:00"}
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pharmacies table
CREATE TABLE IF NOT EXISTS public.pharmacies (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  pharmacy_name TEXT NOT NULL,
  license_number TEXT NOT NULL,
  operating_hours JSONB,
  is_24_hours BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'in_progress')),
  consultation_type TEXT NOT NULL DEFAULT 'video' CHECK (consultation_type IN ('video', 'in_person')),
  symptoms TEXT,
  notes TEXT,
  prescription TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medical records table
CREATE TABLE IF NOT EXISTS public.medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  record_type TEXT NOT NULL CHECK (record_type IN ('consultation', 'prescription', 'lab_result', 'diagnosis')),
  title TEXT NOT NULL,
  description TEXT,
  diagnosis TEXT,
  prescription TEXT,
  lab_results JSONB,
  attachments TEXT[], -- URLs to file attachments
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medicines table
CREATE TABLE IF NOT EXISTS public.medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  generic_name TEXT,
  manufacturer TEXT,
  category TEXT,
  description TEXT,
  dosage_form TEXT, -- tablet, capsule, syrup, etc.
  strength TEXT, -- 500mg, 10ml, etc.
  price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pharmacy inventory table
CREATE TABLE IF NOT EXISTS public.pharmacy_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pharmacy_id UUID NOT NULL REFERENCES public.pharmacies(id) ON DELETE CASCADE,
  medicine_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  reorder_level INTEGER DEFAULT 10,
  expiry_date DATE,
  batch_number TEXT,
  cost_price DECIMAL(10,2),
  selling_price DECIMAL(10,2),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(pharmacy_id, medicine_id, batch_number)
);

-- Create prescription orders table
CREATE TABLE IF NOT EXISTS public.prescription_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pharmacy_id UUID NOT NULL REFERENCES public.pharmacies(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  prescription_text TEXT NOT NULL,
  medicines JSONB NOT NULL, -- array of {medicine_id, quantity, instructions}
  total_amount DECIMAL(10,2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'ready', 'dispensed', 'cancelled')),
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ready_date TIMESTAMP WITH TIME ZONE,
  dispensed_date TIMESTAMP WITH TIME ZONE
);

-- Create symptom checker sessions table
CREATE TABLE IF NOT EXISTS public.symptom_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  symptoms TEXT[] NOT NULL,
  analysis_result JSONB,
  recommendations TEXT[],
  urgency_level TEXT CHECK (urgency_level IN ('low', 'medium', 'high', 'emergency')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacy_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescription_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for doctors
CREATE POLICY "Doctors can view their own data" ON public.doctors FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Doctors can update their own data" ON public.doctors FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Doctors can insert their own data" ON public.doctors FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Patients can view doctor profiles" ON public.doctors FOR SELECT USING (true);

-- RLS Policies for pharmacies
CREATE POLICY "Pharmacies can view their own data" ON public.pharmacies FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Pharmacies can update their own data" ON public.pharmacies FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Pharmacies can insert their own data" ON public.pharmacies FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can view pharmacy profiles" ON public.pharmacies FOR SELECT USING (true);

-- RLS Policies for appointments
CREATE POLICY "Users can view their own appointments" ON public.appointments FOR SELECT USING (
  auth.uid() = patient_id OR 
  auth.uid() = doctor_id
);
CREATE POLICY "Patients can create appointments" ON public.appointments FOR INSERT WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "Doctors and patients can update appointments" ON public.appointments FOR UPDATE USING (
  auth.uid() = patient_id OR 
  auth.uid() = doctor_id
);

-- RLS Policies for medical records
CREATE POLICY "Users can view their own medical records" ON public.medical_records FOR SELECT USING (
  auth.uid() = patient_id OR 
  auth.uid() = doctor_id
);
CREATE POLICY "Doctors can create medical records" ON public.medical_records FOR INSERT WITH CHECK (auth.uid() = doctor_id);
CREATE POLICY "Doctors can update medical records" ON public.medical_records FOR UPDATE USING (auth.uid() = doctor_id);

-- RLS Policies for medicines (public read)
CREATE POLICY "Anyone can view medicines" ON public.medicines FOR SELECT USING (true);

-- RLS Policies for pharmacy inventory
CREATE POLICY "Pharmacies can manage their inventory" ON public.pharmacy_inventory FOR ALL USING (
  EXISTS (SELECT 1 FROM public.pharmacies WHERE id = pharmacy_id AND auth.uid() = id)
);
CREATE POLICY "Users can view pharmacy inventory" ON public.pharmacy_inventory FOR SELECT USING (true);

-- RLS Policies for prescription orders
CREATE POLICY "Users can view their prescription orders" ON public.prescription_orders FOR SELECT USING (
  auth.uid() = patient_id OR 
  EXISTS (SELECT 1 FROM public.pharmacies WHERE id = pharmacy_id AND auth.uid() = id)
);
CREATE POLICY "Patients can create prescription orders" ON public.prescription_orders FOR INSERT WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "Pharmacies can update prescription orders" ON public.prescription_orders FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.pharmacies WHERE id = pharmacy_id AND auth.uid() = id)
);

-- RLS Policies for symptom sessions
CREATE POLICY "Users can view their own symptom sessions" ON public.symptom_sessions FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "Users can create their own symptom sessions" ON public.symptom_sessions FOR INSERT WITH CHECK (auth.uid() = patient_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'patient')
  );
  
  -- If user is a doctor, create doctor record
  IF (NEW.raw_user_meta_data ->> 'role') = 'doctor' THEN
    INSERT INTO public.doctors (id, specialization, experience_years, consultation_fee)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data ->> 'specialization', 'General Medicine'),
      COALESCE((NEW.raw_user_meta_data ->> 'experience_years')::INTEGER, 0),
      COALESCE((NEW.raw_user_meta_data ->> 'consultation_fee')::DECIMAL, 500.00)
    );
  END IF;
  
  -- If user is a pharmacy, create pharmacy record
  IF (NEW.raw_user_meta_data ->> 'role') = 'pharmacy' THEN
    INSERT INTO public.pharmacies (id, pharmacy_name, license_number)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data ->> 'pharmacy_name', 'Pharmacy'),
      COALESCE(NEW.raw_user_meta_data ->> 'license_number', 'LIC000')
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
