export interface InsightArticle {
  id: string;
  title: string;
  titleBn?: string;
  doctorName: string;
  doctorTitle: string;
  doctorSpecialty: string;
  doctorDegrees: string;
  doctorAvatar?: string;
  image: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  category: string;
  tags: string[];
  hotline?: string;
}

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: "cold-vs-hot-compress",
    title: "Orthopedic, Trauma and Spine Surgeon Professor Dr. Mahbub Hossain Mehedi",
    titleBn: "ব্যথা পেলে কখন ঠান্ডা ও গরম সেঁক নিবেন?",
    doctorName: "Prof. Dr. Mahbub Hossain Mehedi",
    doctorTitle: "Orthopedic, Trauma & Spine Surgeon",
    doctorSpecialty: "Orthopedics",
    doctorDegrees: "MBBS, MS (Ortho), Fellow Spine Surgery (Singapore, India)",
    image: "/ortho_advice_banner.png",
    excerpt: "Should you apply cold or hot ice to your body after an injury? Which ice is best within a few minutes of injury? Orthopedic, Trauma and Spine Surgeon Professor Dr. Mahbub Hossain Mehedi will provide scientific and experienced advice on all these questions. As an experienced doctor, he is with Shukhee. With long experience, he was employed in the Traumatology and Ortho-Surgery Department of Sir Salimullah Medical...",
    content: `
An injury or sudden muscle pain can leave you wondering: should you grab an ice pack or a hot water bag? Applying the wrong type of compress can actually worsen the swelling or inflammation. 

Professor Dr. Mahbub Hossain Mehedi, Orthopedic, Trauma and Spine Surgeon, explains the clear guidelines on when to apply cold and hot compresses:

### 1. When to Use a Cold Compress (Ice therapy / Cryotherapy)
Cold therapy is best applied during the acute phase of an injury—specifically within the first **24 to 48 hours**. 

* **Why it works:** Cold constricts blood vessels (vasoconstriction), which reduces blood flow to the injured area. This significantly minimizes swelling, inflammation, internal bleeding, and numbs the sharp pain.
* **When to use it:**
  * Sudden ankle sprains or joint twists.
  * Fresh muscle strains, bumps, or bruises from an impact.
  * Post-exercise inflammation or acute joint flares (e.g., gout attacks).
* **How to apply:** Use an ice pack wrapped in a thin towel. Apply to the affected area for **15–20 minutes** at a time, every 2 to 4 hours. *Never apply ice directly to the skin to avoid ice burns.*

---

### 2. When to Use a Hot Compress (Heat therapy / Thermotherapy)
Heat therapy is best suited for chronic, lingering pain, muscle stiffness, and joint aches, usually applied **after 48 hours** from the time of injury or for ongoing conditions.

* **Why it works:** Heat dilates blood vessels (vasodilation), increasing blood circulation to the affected area. This delivers oxygen and nutrients that promote healing, helps relax tight muscles, and increases joint flexibility.
* **When to use it:**
  * Chronic joint pain or arthritis (e.g., knee pain, spondylosis).
  * Muscle spasms, cramps, or general body stiffness (e.g., lower back stiffness).
  * Pre-workout routine to loosen tight muscles.
* **How to apply:** Use a hot water bottle, heating pad, or warm damp towel. Apply warm (not boiling hot) heat for **15–20 minutes**. *Ensure the temperature is comfortable to avoid skin burns.*

---

### 💡 Professor's Golden Rule:
If the area is **hot, red, and swollen**, it needs **Cold**. If it is **stiff, aching, and chronic** without active swelling, it needs **Warmth**. 

*If pain persists for more than 3 days, or if there is a suspected fracture, numbness, or inability to bear weight, seek immediate professional orthopedic evaluation.*
    `,
    readTime: "5 min read",
    date: "June 02, 2026",
    category: "Orthopedics & Joint Health",
    tags: ["Ortho Tips", "Pain Relief", "Home Care", "First Aid"],
    hotline: "10657"
  },
  {
    id: "summer-fungal-infections",
    title: "Consultant. Dermatology | Dr. Fatematuz Zohra Antara",
    titleBn: "গরমে চর্ম ও ছত্রাকজনিত সংক্রমণ থেকে বাঁচার উপায়",
    doctorName: "Dr. Fatematuz Zohra Antara",
    doctorTitle: "Consultant Dermatologist & Venereologist",
    doctorSpecialty: "Dermatology",
    doctorDegrees: "MBBS, DDV (BSMMU)",
    image: "/doctor_team.png", // Fallback/styled
    excerpt: "In summer, various types of fungal infections or ringworm appear on the skin. It especially occurs in the armpits and groin. The elderly and diabetic patients who cannot maintain hygiene are at the highest risk...",
    content: `
During the scorching hot and humid summer months in Bangladesh, dermatologists see a massive surge in skin problems, particularly fungal infections and ringworm (tinea). 

**Dr. Fatematuz Zohra Antara**, Consultant Dermatologist, outlines why this happens and how to protect yourself:

### Why Fungal Infections Surge in Summer
Fungi thrive in warm, damp environments. Excessive sweating, tight clothing, and prolonged wetness create the perfect breeding ground for fungal spores. 

* **Ringworm (Tinea Corporis/Cruris):** Appears as itchy, red, circular rashes with raised edges. It commonly affects the groin (jock itch), armpits, underarms, and folded skin areas.
* **Sweat Rashes (Miliaria/Intertrigo):** Friction combined with sweat glands getting blocked causes itching and soreness.
* **High-Risk Groups:** Diabetic patients, elderly individuals, athletes, and anyone who sweats heavily or remains outdoors for long periods.

### Crucial Prevention & Care Guidelines
1. **Maintain Strict Hygiene:** Shower twice a day during peak summer, especially after outdoor activities. Use a mild soap.
2. **Keep the Skin Bone-Dry:** Always pat your body completely dry with a clean towel after bathing. Pay special attention to skin folds (armpits, groin, under-breasts, between toes).
3. **Choose Breathable Fabrics:** Wear loose-fitting, light-colored cotton clothing. Avoid synthetic fabrics like polyester and nylon which trap moisture.
4. **Never Share Personal Items:** Fungal infections are highly contagious. Do not share towels, soap, combs, bedsheets, or clothing with family members.
5. **Wash Clothes and Towels Daily:** Wash your daily wear in hot water and dry them thoroughly in direct sunlight.

### 🚫 Warning Against Self-Medication
Many patients mistakenly buy over-the-counter mixed steroid creams (e.g., containing betamethasone or clobetasol). While they provide temporary itch relief, they make the fungus stronger, damage the skin barrier, and make the infection extremely difficult to cure. Always consult a certified dermatologist for proper antifungal therapy.
    `,
    readTime: "4 min read",
    date: "May 28, 2026",
    category: "Dermatology & Skincare",
    tags: ["Dermatology", "Summer Care", "Hygiene", "Skin Health"]
  },
  {
    id: "kidney-health-tips",
    title: "Experienced kidney disease and medicine specialist Dr. Nasim Musa",
    titleBn: "কিডনি ভালো রাখার ২০-৩০ বছরের দীর্ঘমেয়াদী উপায়",
    doctorName: "Dr. Nasim Musa",
    doctorTitle: "Kidney Disease & Medicine Specialist",
    doctorSpecialty: "Nephrology",
    doctorDegrees: "MBBS, MD (Nephrology), FCPS (Medicine)",
    image: "/doctor_team.png",
    excerpt: "Once the kidneys fail, there is only one solution - dialysis and transplant. But even 10% of the country's patients cannot afford this expense. How to keep the kidneys healthy for 20-30 years by following simple daily life guidelines...",
    content: `
Kidney disease is often called a "silent killer" because it can destroy up to 80% of your kidney function before showing any physical symptoms. 

**Dr. Nasim Musa**, an experienced kidney disease and medicine specialist, warns that dialysis and transplants are financially exhausting for over 90% of families in Bangladesh. Prevention is our only effective shield.

Here is Dr. Nasim Musa's long-term formula to keep your kidneys healthy for 20 to 30 years:

### 1. Hydrate Wisely (But Don't Overdo It)
* Drink **2 to 2.5 liters** of clean water daily under normal conditions. 
* Do not consume excessive energy drinks or carbonated sodas, which contain high levels of phosphates and artificial additives harmful to renal filters.

### 2. Tight Control of Blood Pressure & Diabetes
* High blood pressure and high blood sugar are the **two leading causes** of chronic kidney disease (CKD).
* If you have diabetes or hypertension, keep them under strict control through regular monitoring, medication, and low-salt diets.

### 3. Stop Popping Painkillers (NSAIDs)
* Self-medicating with common painkillers like diclofenac, ketorolac, naproxen, or ibuprofen is a primary cause of acute kidney injury (AKI) in Bangladesh.
* *Rule:* Never take painkillers without a registered physician's prescription.

### 4. Limit Salt & Processed Foods
* Excess sodium raises blood pressure and puts extreme strain on the kidneys' delicate filtering units (nephrons).
* Reduce dietary salt and avoid highly processed packed snacks, instant noodles, and canned food.

### 5. Regular Screening (The 30-Second Test)
* If you are over 40, or have a family history of kidney disease, diabetes, or high blood pressure, get an annual **Serum Creatinine** blood test and a **Urine Routine Examination (R/E)**. These simple, cheap tests can detect kidney damage in its earliest, reversible stages.
    `,
    readTime: "6 min read",
    date: "May 25, 2026",
    category: "Nephrology & Medicine",
    tags: ["Kidney Health", "Hypertension", "Diabetes", "Preventive Care"]
  },
  {
    id: "understanding-schizophrenia",
    title: "Experienced CBT therapist and addiction specialist Sonia Parveen",
    titleBn: "সিজোফ্রেনিয়া ও মানসিক রোগ নিরাময়ে সিবিটি (CBT) থেরাপি",
    doctorName: "Sonia Parveen",
    doctorTitle: "CBT Therapist & Addiction Specialist",
    doctorSpecialty: "Psychotherapy & Counseling",
    doctorDegrees: "BSc & MSc in Psychology, Specialist Training in CBT & Psychotherapy",
    image: "/doctor_team.png",
    excerpt: "Schizophrenia patients believe that someone is controlling their actions or thoughts. Also, unreasonable suspicion, random speech, and loss of the ability to communicate normally are common symptoms. Learn how Cognitive Behavioral Therapy helps...",
    content: `
Mental health is just as important as physical health, yet disorders like Schizophrenia remain heavily stigmatized and misunderstood in our society. Many associate it with spiritual possession, leading to delayed medical care.

**Sonia Parveen**, an experienced CBT therapist and addiction specialist, explains schizophrenia and how psychotherapy plays a pivotal role in recovery:

### Demystifying Schizophrenia
Schizophrenia is a chronic brain disorder characterized by disruptions in thinking, emotions, and behavior. It is **not** a split personality, nor is it caused by bad parenting or supernatural forces.

* **Key Symptoms:**
  * **Delusions:** Strong false beliefs (e.g., believing someone is monitoring, tracking, or trying to harm them).
  * **Hallucinations:** Hearing voices or seeing things that others do not.
  * **Disorganized Speech:** Fragmented, random conversations or abrupt shifts in topic.
  * **Social Withdrawal:** Neglecting hygiene, losing interest in relationships, and isolating oneself.

### The Role of CBT (Cognitive Behavioral Therapy)
While antipsychotic medications are essential to manage chemical imbalances in the brain, medication alone is often not enough for long-term social rehabilitation. This is where **CBT** is highly effective:

1. **Identifying Triggers:** CBT helps the patient identify stressful thoughts or environments that trigger hallucinations or high anxiety.
2. **Reality Testing:** The therapist works with the patient to evaluate false beliefs (delusions) logically, helping them differentiate between symptom-induced thoughts and reality.
3. **Developing Coping Skills:** CBT teaches structured techniques to manage auditory hallucinations, reduce social anxiety, and build healthy daily routines.
4. **Family Education:** Group CBT sessions educate family members, teaching them how to communicate supportively without reinforcing delusions or showing critical, hostile behaviors.

*Remember: With early psychiatric intervention, continuous medication, and expert psychotherapy, patients with schizophrenia can lead satisfying, independent, and productive lives.*
    `,
    readTime: "5 min read",
    date: "May 18, 2026",
    category: "Mental Health & Psychology",
    tags: ["Mental Health", "Psychology", "CBT Therapy", "Wellness"]
  },
  {
    id: "managing-knee-pain",
    title: "Experienced orthopedic specialist Dr. Zillur Hasan Rony",
    titleBn: "হাঁটুর ব্যথা ও ক্ষয় রোধে করণীয় ও আধুনিক চিকিৎসা",
    doctorName: "Dr. Zillur Hasan Rony",
    doctorTitle: "Experienced Orthopedic Specialist",
    doctorSpecialty: "Orthopedics",
    doctorDegrees: "MBBS, D-Ortho (NITOR), Specialist in Joint Reconstruction",
    image: "/doctor_team.png",
    excerpt: "Knee pain occurs when sitting up, walking up and down stairs, or even when walking. Does knee erosion increase or decrease by walking? What are the modern, non-surgical methods to protect your joints? Dr. Zillur Hasan Rony answers...",
    content: `
Knee osteoarthritis—the wearing down of protective cartilage at the ends of bones—is one of the most common complaints among middle-aged and elderly individuals in Bangladesh. 

**Dr. Zillur Hasan Rony**, experienced orthopedic specialist, addresses common myths and outlines practical joint protection guidelines:

### The Big Myth: "Does Walking Worsen Knee Erosion?"
Many believe that if their knees hurt, they should stop walking completely to avoid further "wear and tear." 

* **The Reality:** The opposite is true! Cartilage has no blood supply; it gets its nutrition from the synovial fluid which circulates only when the joint moves. Joint-friendly walking actually lubricates the knee and strengthens the surrounding quadriceps muscles, which act as natural shock absorbers. 
* *Exception:* Avoid walking if you have acute, excruciating pain or active swelling. Wait for it to settle down under medical care.

### Practical Tips to Protect Your Knees
1. **Maintain Healthy Weight:** Every extra 1 kg of body weight adds about 4 kg of pressure on your knee joints when walking or climbing stairs. Weight reduction is the single most effective way to slow down joint erosion.
2. **Avoid squatting or sitting on the floor:** Use a high commode in the washroom and sit on a chair rather than sitting cross-legged or kneeling on the floor.
3. **Low-impact Exercise:** Incorporate exercises like swimming, static cycling, and knee-strengthening quadriceps sets instead of high-impact running or heavy squatting.
4. **Choose Comfortable Footwear:** Wear soft-soled, flat shoes with good arch support. Avoid high heels or worn-out, hard-bottomed footwear.

### Modern Non-Surgical Treatments
If conservative therapy and medications aren't enough, modern orthopedics offers highly effective minimally-invasive options:
* **Viscosupplementation:** Injecting hyaluronic acid directly into the joint to act as artificial lubrication.
* **PRP (Platelet-Rich Plasma) Therapy:** Using the patient's own blood growth factors to stimulate tissue healing and reduce chronic inflammation.
    `,
    readTime: "5 min read",
    date: "May 10, 2026",
    category: "Orthopedics & Joint Health",
    tags: ["Joint Pain", "Ortho Tips", "Healthy Aging", "Knee Care"]
  }
];
