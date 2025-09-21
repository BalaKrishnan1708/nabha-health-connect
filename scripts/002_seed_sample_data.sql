-- Insert sample medicines
INSERT INTO public.medicines (name, generic_name, manufacturer, category, dosage_form, strength, price) VALUES
('Paracetamol', 'Acetaminophen', 'Generic Pharma', 'Analgesic', 'Tablet', '500mg', 5.00),
('Amoxicillin', 'Amoxicillin', 'Antibiotic Corp', 'Antibiotic', 'Capsule', '250mg', 15.00),
('Crocin', 'Paracetamol', 'GSK', 'Analgesic', 'Tablet', '650mg', 8.00),
('Azithromycin', 'Azithromycin', 'Pfizer', 'Antibiotic', 'Tablet', '500mg', 25.00),
('Omeprazole', 'Omeprazole', 'Generic Pharma', 'Antacid', 'Capsule', '20mg', 12.00),
('Cetirizine', 'Cetirizine', 'Allergy Med', 'Antihistamine', 'Tablet', '10mg', 6.00),
('Metformin', 'Metformin', 'Diabetes Care', 'Antidiabetic', 'Tablet', '500mg', 10.00),
('Amlodipine', 'Amlodipine', 'Heart Care', 'Antihypertensive', 'Tablet', '5mg', 18.00),
('Ibuprofen', 'Ibuprofen', 'Pain Relief', 'NSAID', 'Tablet', '400mg', 7.00),
('Vitamin D3', 'Cholecalciferol', 'Wellness Co', 'Vitamin', 'Capsule', '60000 IU', 20.00)
ON CONFLICT DO NOTHING;
