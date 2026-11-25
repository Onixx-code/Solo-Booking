const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({
  margin: 45,
  size: 'A4',
  info: {
    Title: 'SoloRide Udaipur - Complete System Use Case & Business Specification',
    Author: 'Bhuvan Dwivedi (Founder)',
    Subject: 'Use Case Document & Architecture'
  }
});

const outputPath = path.join(__dirname, 'SoloRide_Udaipur_Use_Case_Specification.pdf');
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Styling helpers
const primaryColor = '#B45309'; // Warm amber
const secondaryColor = '#0369A1'; // Deep cyan
const darkText = '#0F172A';
const mutedText = '#475569';
const borderColor = '#E2E8F0';
const highlightBg = '#FEF3C7';

function drawHeader(title, subtitle) {
  doc.rect(45, 45, 505, 5).fill(primaryColor);
  doc.moveDown(0.8);
  doc.fillColor(primaryColor).fontSize(22).font('Helvetica-Bold').text(title);
  if (subtitle) {
    doc.fillColor(mutedText).fontSize(11).font('Helvetica').text(subtitle);
  }
  doc.moveDown(0.6);
  doc.strokeColor(borderColor).lineWidth(1).moveTo(45, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.8);
}

function drawSectionHeading(num, title) {
  doc.moveDown(0.6);
  doc.fillColor(secondaryColor).fontSize(14).font('Helvetica-Bold').text(`${num}. ${title}`);
  doc.moveDown(0.4);
}

function drawSubheading(title) {
  doc.fillColor(primaryColor).fontSize(11).font('Helvetica-Bold').text(title);
  doc.moveDown(0.2);
}

function drawBullet(title, desc) {
  doc.fillColor(darkText).fontSize(9.5).font('Helvetica-Bold').text(`• ${title}: `, { continued: true });
  doc.fillColor(mutedText).font('Helvetica').text(desc);
  doc.moveDown(0.25);
}

function drawCard(title, contentArr) {
  const startY = doc.y;
  doc.rect(45, startY, 505, 10).fill('#F8FAFC'); // placeholder
}

// ================= PAGE 1 =================
drawHeader('SoloRide Udaipur', 'System Use Case Specification & Business Operational Blueprint');

doc.fillColor(darkText).fontSize(10).font('Helvetica');
doc.text('Document Metadata:', { underline: true });
doc.fontSize(9).fillColor(mutedText);
doc.text('• Project Name: SoloRide Udaipur (SafarBuddy)');
doc.text('• Founder & Operator: Bhuvan Dwivedi');
doc.text('• Contact Details: bhuvandwivedi1234@gmail.com | Phone/WhatsApp: +91 7627011955');
doc.text('• Target Hub: Udaipur (City of Lakes), Rajasthan, India');
doc.text('• Technology Stack: React.js, Vite, React Router, Glassmorphism UI, FormSubmit API, WhatsApp API');
doc.moveDown(0.6);

drawSectionHeading('1', 'Executive Summary & Business Model');
doc.fillColor(darkText).fontSize(9.5).font('Helvetica').text(
  'SoloRide Udaipur is an on-demand mobility and companion platform designed specifically for solo travellers (domestic and international) who arrive in Udaipur and desire to explore the historic city, lakes, and Aravali mountain passes on motorcycles (Royal Enfield, Cruisers, Scooters) with a trusted, verified local companion guide.'
);
doc.moveDown(0.4);
doc.fillColor(mutedText).fontSize(9.5).text(
  'Core Value Proposition: Traditional cab services cannot navigate Udaipur\'s narrow old city ghats (Lal Ghat, Gangaur Ghat, Jagdish Chowk), while auto-rickshaws frequently overcharge and take tourists to commission shops. SoloRide eliminates these friction points with a 100% transparent financial split model where fuel and road meals are covered directly at actuals by the traveller, while platform fees directly compensate the local companion rider.'
);

drawSectionHeading('2', 'Primary System Actors & Roles');
drawBullet('Actor 1: Solo Traveller (Domestic Explorer)', 'Indian backpacker, solo nomad, or professional visiting Udaipur seeking an authentic, affordable, and safe bike experience.');
drawBullet('Actor 2: International / Abroad Tourist', 'Foreign backpacker arriving from Europe, USA, UK, etc., requiring English fluency, airport meet-and-greet, currency transparency, and zero-scam assurance.');
drawBullet('Actor 3: Verified Riding Companion (Buddy Boy)', 'Local Udaipur youth, student, or enthusiast owning a two-wheeler, vetted for driving safety and local historical knowledge.');
drawBullet('Actor 4: Platform Founder & Dispatcher (Bhuvan Dwivedi)', 'Central manager who receives leads via email/WhatsApp, collects platform fees, assigns companions, and ensures quality control.');
drawBullet('Actor 5: External Partners (Bike Rentals & Hostels)', 'Local bike rental fleets (for self-drive/convoy) and backpacker hostels (Zostel, Moustache) serving as distribution touchpoints.');

drawSectionHeading('3', 'System Architecture & Data Flow');
doc.fillColor(darkText).fontSize(9.5).font('Helvetica-Bold').text('Operational Cashflow & Communication Architecture:');
doc.fillColor(mutedText).fontSize(9).font('Helvetica');
doc.text('1. Traveller visits website -> Customizes Route, Vehicle, Duration in Dynamic Calculator.');
doc.text('2. Booking Form Submission triggers dual dispatch:');
doc.text('   a) Background REST API POST to FormSubmit.co delivering lead to bhuvandwivedi1234@gmail.com.');
doc.text('   b) Direct URI redirection opening WhatsApp (+91 7627011955) with pre-filled ride summary.');
doc.text('3. Founder confirms booking with traveller and dispatches vetted local buddy to specified pickup point.');
doc.text('4. Ride Execution: Solo traveller directly pays for petrol at IndianOil/BPCL fuel pumps based on km.');
doc.text('5. Ride Completion: Founder Bhuvan transfers companion daily compensation via UPI directly to rider boy.');

// ================= PAGE 2 =================
doc.addPage();
drawHeader('SoloRide Udaipur', 'Detailed System Use Case Catalog (UC-01 to UC-04)');

drawSectionHeading('4', 'Detailed Use Cases (Part 1)');

drawSubheading('Use Case UC-01: Browse & Filter Curated Udaipur Riding Routes');
drawBullet('Primary Actor', 'Solo Traveller (Domestic / Abroad)');
drawBullet('Pre-conditions', 'User visits SoloRide homepage or /plans route.');
drawBullet('Flow of Events', '1. User browses 4 signature tour packages (Royal Lakes, Sajjangarh Sunset, 3 Lakes & Bahubali, Kumbhalgarh Pass). 2. System displays estimated duration, distance, badge, vehicle recommendation, platform fee, and estimated fuel. 3. User clicks "Book Plan & Match Buddy" which auto-populates modal.');
drawBullet('Post-conditions', 'Selected plan is passed to the booking engine state.');
doc.moveDown(0.4);

drawSubheading('Use Case UC-02: Interactive Transparent Price & Expense Calculation');
drawBullet('Primary Actor', 'Solo Traveller, Bhuvan Dwivedi');
drawBullet('Pre-conditions', 'User navigates to /pricing or uses hero calculator.');
drawBullet('Flow of Events', '1. User selects duration: Half Day (4h, ~35km), Full Day (8h, ~75km), or 2-Day Epic (16h, ~190km). 2. User selects vehicle (Royal Enfield Classic 350, Himalayan 450, Activa 125, Avenger 220, Sedan). 3. User selects riding mode (Pillion Passenger, Self Drive, Two-Bike Convoy). 4. Dynamic algorithm calculates itemized breakdown: Platform/Companion Fee + Estimated Petrol (km / mileage * fuel rate) + Road Refreshment Allowance. 5. Total quotation is rendered in real-time without page reload.');
drawBullet('Post-conditions', 'User understands exact financial split and can proceed to lock rate.');
doc.moveDown(0.4);

drawSubheading('Use Case UC-03: Interactive 42 km Route & Elevation Simulation');
drawBullet('Primary Actor', 'Solo Traveller');
drawBullet('Pre-conditions', 'User opens /route-map tab.');
drawBullet('Flow of Events', '1. User engages interactive SVG trail runner covering 6 checkpoints: Jagdish Chowk -> Lake Pichola -> Fatehsagar -> Sajjangarh Peak (938m) -> Bahubali Hills (610m) -> Rayta Hills (745m). 2. User toggles "Auto-Ride Along Trail" or manual stop buttons. 3. System dynamically updates live altitude meter, odometer gauge, cumulative petrol burn, checkpoint photo preview, and local buddy secret insider tips.');
drawBullet('Post-conditions', 'Traveller gains route confidence and selects specific pickup stops.');
doc.moveDown(0.4);

drawSubheading('Use Case UC-04: Multi-Currency Switcher for Abroad Guests');
drawBullet('Primary Actor', 'International Nomad / Foreign Backpacker');
drawBullet('Pre-conditions', 'User selects currency dropdown in floating navbar.');
drawBullet('Flow of Events', '1. User toggles between INR (Rs), USD ($), EUR (Euro), and GBP (Pound). 2. All pricing displays across packages, calculator cards, and modal recalculate instantly at calibrated exchange rates.');
drawBullet('Post-conditions', 'Zero currency ambiguity for foreign travellers landing in India.');

// ================= PAGE 3 =================
doc.addPage();
drawHeader('SoloRide Udaipur', 'Detailed System Use Case Catalog (UC-05 to UC-08)');

drawSectionHeading('5', 'Detailed Use Cases (Part 2)');

drawSubheading('Use Case UC-05: Solo Ride Booking & Multi-Channel Lead Dispatch');
drawBullet('Primary Actor', 'Solo Traveller, Founder Bhuvan Dwivedi');
drawBullet('Pre-conditions', 'Traveller completes information in Booking Modal.');
drawBullet('Flow of Events', '1. User inputs Name, Origin (Domestic/International), WhatsApp Phone, Email, Date, Pickup Location (e.g. Lal Ghat, Station, Airport), and Special Notes. 2. User clicks "Confirm & Chat on WhatsApp with Bhuvan". 3. System generates unique reference code (e.g. #UDR-7842). 4. System triggers celebratory confetti animation. 5. Background asynchronous REST API sends structured payload to bhuvandwivedi1234@gmail.com. 6. Window directs traveller to wa.me/917627011955 with formatted booking message. 7. Confirmation screen displays direct WhatsApp and Click-to-Call (+91 7627011955) buttons.');
drawBullet('Post-conditions', 'Lead is persisted in founder email and WhatsApp for immediate dispatch.');
doc.moveDown(0.4);

drawSubheading('Use Case UC-06: Local Companion Rider Onboarding');
drawBullet('Primary Actor', 'Udaipur Youth / Local Rider, Bhuvan Dwivedi');
drawBullet('Pre-conditions', 'Local rider accesses /partner page.');
drawBullet('Flow of Events', '1. Applicant reviews daily earning structure (Rs 1,200 - Rs 2,500/day guaranteed). 2. Applicant submits Name, WhatsApp, Bike Model, Languages Spoken, and Guiding Experience. 3. Form dispatches details to founder email and WhatsApp (+91 7627011955). 4. Founder conducts 10-minute vetting (Aadhaar, Driving License, RC/Insurance, safe riding protocol).');
drawBullet('Post-conditions', 'Applicant is added to active companion pool for ride assignments.');
doc.moveDown(0.4);

drawSubheading('Use Case UC-07: Ride Execution, Fuel Pump Split & Payout');
drawBullet('Primary Actor', 'Solo Traveller, Riding Companion, Bhuvan Dwivedi');
drawBullet('Pre-conditions', 'Booking confirmed and rider arrives at pickup point.');
drawBullet('Flow of Events', '1. Companion provides sanitized helmet and meets traveller. 2. Prior to departure, traveller and companion pull into local petrol pump; traveller pays for fuel directly based on tour kilometers. 3. Companion guides traveller through curated route, stops for photography, and shares history. 4. Upon tour conclusion, traveller confirms completion. 5. Founder Bhuvan transfers companion fees via UPI (e.g. Rs 1,400 for full day). 6. Founder retains platform margin (e.g. Rs 1,100 net profit).');
drawBullet('Post-conditions', 'Traveller enjoys authentic ride; companion is paid; platform realizes profit.');
doc.moveDown(0.4);

drawSubheading('Use Case UC-08: International Safety & Anti-Scam Protocol');
drawBullet('Primary Actor', 'International Solo Traveller, Female Solo Traveller');
drawBullet('Pre-conditions', 'Foreign or female traveller books ride via website.');
drawBullet('Flow of Events', '1. System allows request for verified female riding companion (e.g. Priya Rathore). 2. Companion verifies GPS live shareable tracking link with traveller loved ones. 3. Zero-commission policy guarantees no diversion to high-pressure textile/gem stores.');
drawBullet('Post-conditions', 'Safe cultural immersion and 5-star TripAdvisor / Google review generation.');

// ================= PAGE 4 =================
doc.addPage();
drawHeader('SoloRide Udaipur', 'Financial Projections, Revenue Splits & Action Blueprint');

drawSectionHeading('6', 'Financial P&L Split Breakdown');

doc.fillColor(darkText).fontSize(9.5).font('Helvetica');
doc.text('Table 1: Per-Ride Revenue & Profit Distribution');
doc.moveDown(0.3);

const colX = [45, 140, 230, 330, 430];
const rowYStart = doc.y;

// Table header
doc.rect(45, rowYStart, 505, 18).fill(highlightBg);
doc.fillColor(primaryColor).fontSize(8.5).font('Helvetica-Bold');
doc.text('Tour Plan', colX[0] + 5, rowYStart + 5);
doc.text('Traveller Fee', colX[1], rowYStart + 5);
doc.text('Rider Payout', colX[2], rowYStart + 5);
doc.text('Bhuvan Profit', colX[3], rowYStart + 5);
doc.text('Petrol (At Pump)', colX[4], rowYStart + 5);

const rows = [
  ['Half Day City (4h)', 'Rs 1,499', 'Rs 800', 'Rs 699 (46%)', 'Rs 450 (Traveller)'],
  ['Full Day Explorer (8h)', 'Rs 2,499', 'Rs 1,400', 'Rs 1,099 (44%)', 'Rs 850 (Traveller)'],
  ['Kumbhalgarh Epic (10h)', 'Rs 3,299', 'Rs 1,800', 'Rs 1,499 (45%)', 'Rs 1,400 (Traveller)'],
  ['Abroad Guest Custom', '$45 (Rs 3,750)', 'Rs 1,600', 'Rs 2,150 (57%)', 'Rs 850 (Traveller)']
];

let curY = rowYStart + 18;
doc.font('Helvetica').fontSize(8.5);

rows.forEach((r, idx) => {
  const bg = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
  doc.rect(45, curY, 505, 16).fill(bg);
  doc.fillColor(darkText);
  doc.text(r[0], colX[0] + 5, curY + 4);
  doc.text(r[1], colX[1], curY + 4);
  doc.fillColor(secondaryColor).text(r[2], colX[2], curY + 4);
  doc.fillColor(primaryColor).font('Helvetica-Bold').text(r[3], colX[3], curY + 4);
  doc.fillColor(mutedText).font('Helvetica').text(r[4], colX[4], curY + 4);
  curY += 16;
});

doc.moveDown(1.5);
drawSectionHeading('7', 'Monthly Profit Projections');
drawBullet('Off-Peak Season (75 rides / month)', '75 rides * Rs 900 avg profit = Rs 67,500 / month net profit.');
drawBullet('Peak Mewar Season - Oct to Mar (280 rides / month)', '280 rides * Rs 1,100 avg profit = Rs 3,08,000 / month net profit!');
drawBullet('Secondary Commission Streams', 'Bike rental shop tie-ups (Rs 250/rental) + Hostel activity partnerships (15% commission) = Additional Rs 25,000 - Rs 45,000 / month.');

drawSectionHeading('8', 'Operational Checklist for Founder Bhuvan');
drawBullet('Step 1: Deploy Website Live', 'Drop production build folder (D:\\Solo Traveller\\dist) on app.netlify.com/drop for live HTTPS URL.');
drawBullet('Step 2: Activate FormSubmit', 'Check inbox/spam at bhuvandwivedi1234@gmail.com for FormSubmit confirmation email and click "Activate Form".');
drawBullet('Step 3: Onboard Initial 3 Riders', 'Onboard 3 college students/riders with Royal Enfield and Activa; verify Aadhaar and driving license.');
drawBullet('Step 4: Distribute Standees', 'Place 5 QR-code standees at Zostel, Moustache, and Hosteller near Lake Pichola / Lal Ghat.');

doc.moveDown(0.8);
doc.rect(45, doc.y, 505, 30).fill('#ECFDF5');
doc.fillColor('#047857').fontSize(9).font('Helvetica-Bold');
doc.text('SoloRide Udaipur Verification Status: System Fully Tested, Responsive & Ready for Commercial Launch.', 55, doc.y - 22, { align: 'center' });
doc.fillColor('#065F46').fontSize(8).font('Helvetica').text('Founder Direct Helpline: +91 7627011955 | Email: bhuvandwivedi1234@gmail.com', 55, doc.y + 2, { align: 'center' });

doc.end();
stream.on('finish', () => {
  console.log('PDF generated successfully at: ' + outputPath);
});
