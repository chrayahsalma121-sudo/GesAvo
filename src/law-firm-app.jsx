import { useCallback, useEffect, useMemo, useState } from 'react';

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const STRINGS = {
  en: {
    appName: 'Lexis Pro', appTagline: 'Law Firm Management', navigation: 'Navigation', system: 'System', settings: 'Settings',
    dashboard: 'Dashboard', clients: 'Clients', cases: 'Cases', documents: 'Documents', calendar: 'Calendar', finance: 'Finance', tasks: 'Tasks', notes: 'Notes',
    searchPlaceholder: 'Search clients, cases, documents...', addClient: 'Add Client', openCase: 'Open Case', newTask: 'New Task', scheduleHearing: 'Schedule Hearing', uploadDocument: 'Upload Document', recordTransaction: 'Record Transaction',
    darkMode: 'Dark mode', lightMode: 'Light mode', language: 'Language', leadAttorney: 'Lead Attorney',
    activeClients: 'Active Clients', activeCases: 'Active Cases', outstandingFees: 'Outstanding Fees', upcomingHearings: 'Upcoming Hearings', addedThisMonth: '2 added this month', openFiles: 'Open legal files', pendingCollection: 'Pending collection', next30Days: 'Next 30 days',
    priorityTasks: 'Priority Tasks', recentActivity: 'Recent Activity', financeSnapshot: 'Finance Snapshot', quickSummary: 'Quick Summary',
    client: 'Client', case: 'Case', status: 'Status', phone: 'Phone', email: 'Email', cin: 'CIN / CNIE', address: 'Address', lastActivity: 'Last Activity', actions: 'Actions', view: 'View', back: 'Back', save: 'Save', cancel: 'Cancel', close: 'Close',
    name: 'Name', totalFees: 'Total Fees', paidFees: 'Paid Fees', balance: 'Balance', notesLabel: 'Notes', noClients: 'No clients found', noClientsHint: 'Try a different search term.', clientProfile: 'Client Profile', contactInfo: 'Contact Information', financialInfo: 'Financial Information', relatedCases: 'Related Cases', clientDocuments: 'Client Documents',
    caseTitle: 'Case Title', type: 'Type', court: 'Court', nextHearing: 'Next Hearing', opened: 'Opened', description: 'Description', opponent: 'Opponent', lawyer: 'Lawyer', hearings: 'Hearings', caseTimeline: 'Case Timeline', noCases: 'No cases found',
    fileName: 'File Name', category: 'Category', size: 'Size', date: 'Date', download: 'Download', noDocuments: 'No documents found',
    scheduledHearings: 'Scheduled Hearings', pastHearings: 'Past Hearings', outcome: 'Outcome',
    totalInvoiced: 'Total Invoiced', totalReceived: 'Total Received', outstanding: 'Outstanding', collectionRate: 'Collection Rate', allClients: 'All clients', paymentsCollected: 'Payments collected', ofTotalFees: 'Of total fees', overview: 'Overview', transactions: 'Transactions', balances: 'Balances', outstandingBalances: 'Outstanding Balances by Client', paid: 'Paid', due: 'Due', totalBilled: 'Total Billed', amount: 'Amount', transactionType: 'Transaction Type',
    todo: 'To Do', inProgress: 'In Progress', done: 'Done', moveTo: 'Move to', priority: 'Priority', dueDate: 'Due Date',
    noteComposer: 'Case Notes', writeNote: 'Write a note...', attachTo: 'Attach to', addNote: 'Add Note',
    fullName: 'Full Name', enterClientName: 'Enter client full name', enterCin: 'Enter CIN / CNIE', enterPhone: 'Enter phone number', enterEmail: 'Enter email address', enterAddress: 'Enter address', optionalNotes: 'Optional notes',
    selectClient: 'Select client', selectCase: 'Select case', selectType: 'Select type', enterCaseTitle: 'Enter case title', enterCourt: 'Enter court', enterOpponent: 'Enter opponent', enterDescription: 'Enter description',
    taskTitle: 'Task Title', enterTaskTitle: 'Enter task title', documentName: 'Document Name', dragDrop: 'Drag and drop a file here', chooseFile: 'or choose from your device',
    createdClient: 'Client added successfully.', createdCase: 'Case opened successfully.', createdTask: 'Task created.', createdHearing: 'Hearing scheduled.', uploadedDoc: 'Document uploaded.', recordedTransaction: 'Transaction recorded.',
    active: 'Active', pending: 'Pending', closed: 'Closed', urgent: 'Urgent', civil: 'Civil', criminal: 'Criminal', commercial: 'Commercial', family: 'Family', property: 'Real Estate', completed: 'Completed', upcoming: 'Upcoming', high: 'High', normal: 'Normal', low: 'Low', invoice: 'Invoice', payment: 'Payment', expense: 'Expense', outstandingStatus: 'Outstanding',
    monday: 'Mo', tuesday: 'Tu', wednesday: 'We', thursday: 'Th', friday: 'Fr', saturday: 'Sa', sunday: 'Su',
  },
  fr: {
    appName: 'Lexis Pro', appTagline: 'Gestion de cabinet juridique', navigation: 'Navigation', system: 'Système', settings: 'Paramètres',
    dashboard: 'Tableau de bord', clients: 'Clients', cases: 'Dossiers', documents: 'Documents', calendar: 'Agenda', finance: 'Finance', tasks: 'Tâches', notes: 'Notes',
    searchPlaceholder: 'Rechercher clients, dossiers, documents...', addClient: 'Ajouter client', openCase: 'Ouvrir dossier', newTask: 'Nouvelle tâche', scheduleHearing: 'Planifier audience', uploadDocument: 'Importer document', recordTransaction: 'Enregistrer transaction',
    darkMode: 'Mode sombre', lightMode: 'Mode clair', language: 'Langue', leadAttorney: 'Avocat principal',
    activeClients: 'Clients actifs', activeCases: 'Dossiers actifs', outstandingFees: 'Honoraires dus', upcomingHearings: 'Audiences à venir', addedThisMonth: '2 ajoutés ce mois', openFiles: 'Dossiers ouverts', pendingCollection: 'En attente de recouvrement', next30Days: 'Prochains 30 jours',
    priorityTasks: 'Tâches prioritaires', recentActivity: 'Activité récente', financeSnapshot: 'Aperçu financier', quickSummary: 'Résumé rapide',
    client: 'Client', case: 'Dossier', status: 'Statut', phone: 'Téléphone', email: 'Email', cin: 'CIN / CNIE', address: 'Adresse', lastActivity: 'Dernière activité', actions: 'Actions', view: 'Voir', back: 'Retour', save: 'Enregistrer', cancel: 'Annuler', close: 'Fermer',
    name: 'Nom', totalFees: 'Total honoraires', paidFees: 'Honoraires payés', balance: 'Solde', notesLabel: 'Notes', noClients: 'Aucun client trouvé', noClientsHint: 'Essayez un autre mot-clé.', clientProfile: 'Profil client', contactInfo: 'Informations de contact', financialInfo: 'Informations financières', relatedCases: 'Dossiers liés', clientDocuments: 'Documents du client',
    caseTitle: 'Titre du dossier', type: 'Type', court: 'Tribunal', nextHearing: 'Prochaine audience', opened: 'Ouvert le', description: 'Description', opponent: 'Partie adverse', lawyer: 'Avocat', hearings: 'Audiences', caseTimeline: 'Chronologie du dossier', noCases: 'Aucun dossier trouvé',
    fileName: 'Nom du fichier', category: 'Catégorie', size: 'Taille', date: 'Date', download: 'Télécharger', noDocuments: 'Aucun document trouvé',
    scheduledHearings: 'Audiences planifiées', pastHearings: 'Audiences passées', outcome: 'Résultat',
    totalInvoiced: 'Total facturé', totalReceived: 'Total reçu', outstanding: 'Impayé', collectionRate: 'Taux de recouvrement', allClients: 'Tous les clients', paymentsCollected: 'Paiements encaissés', ofTotalFees: 'Des honoraires totaux', overview: 'Aperçu', transactions: 'Transactions', balances: 'Soldes', outstandingBalances: 'Soldes dus par client', paid: 'Payé', due: 'Dû', totalBilled: 'Total facturé', amount: 'Montant', transactionType: 'Type de transaction',
    todo: 'À faire', inProgress: 'En cours', done: 'Terminé', moveTo: 'Déplacer vers', priority: 'Priorité', dueDate: 'Échéance',
    noteComposer: 'Notes de dossier', writeNote: 'Écrire une note...', attachTo: 'Associer à', addNote: 'Ajouter note',
    fullName: 'Nom complet', enterClientName: 'Entrer le nom complet', enterCin: 'Entrer CIN / CNIE', enterPhone: 'Entrer le téléphone', enterEmail: 'Entrer l’adresse email', enterAddress: 'Entrer l’adresse', optionalNotes: 'Notes optionnelles',
    selectClient: 'Sélectionner client', selectCase: 'Sélectionner dossier', selectType: 'Sélectionner type', enterCaseTitle: 'Entrer titre du dossier', enterCourt: 'Entrer tribunal', enterOpponent: 'Entrer partie adverse', enterDescription: 'Entrer description',
    taskTitle: 'Titre de la tâche', enterTaskTitle: 'Entrer titre de la tâche', documentName: 'Nom du document', dragDrop: 'Glisser-déposer un fichier ici', chooseFile: 'ou choisir depuis votre appareil',
    createdClient: 'Client ajouté avec succès.', createdCase: 'Dossier ouvert avec succès.', createdTask: 'Tâche créée.', createdHearing: 'Audience planifiée.', uploadedDoc: 'Document importé.', recordedTransaction: 'Transaction enregistrée.',
    active: 'Actif', pending: 'En attente', closed: 'Clôturé', urgent: 'Urgent', civil: 'Civil', criminal: 'Pénal', commercial: 'Commercial', family: 'Famille', property: 'Immobilier', completed: 'Terminé', upcoming: 'À venir', high: 'Élevée', normal: 'Normale', low: 'Faible', invoice: 'Facture', payment: 'Paiement', expense: 'Dépense', outstandingStatus: 'Impayé',
    monday: 'Lu', tuesday: 'Ma', wednesday: 'Me', thursday: 'Je', friday: 'Ve', saturday: 'Sa', sunday: 'Di',
  },
  ar: {
    appName: 'ليكسيس برو', appTagline: 'تدبير مكتب المحاماة', navigation: 'التنقل', system: 'النظام', settings: 'الإعدادات',
    dashboard: 'لوحة التحكم', clients: 'الموكلون', cases: 'الملفات', documents: 'الوثائق', calendar: 'الأجندة', finance: 'المالية', tasks: 'المهام', notes: 'الملاحظات',
    searchPlaceholder: 'ابحث عن موكلين أو ملفات أو وثائق...', addClient: 'إضافة موكل', openCase: 'فتح ملف', newTask: 'مهمة جديدة', scheduleHearing: 'برمجة جلسة', uploadDocument: 'رفع وثيقة', recordTransaction: 'تسجيل معاملة',
    darkMode: 'الوضع الداكن', lightMode: 'الوضع الفاتح', language: 'اللغة', leadAttorney: 'المحامي المسؤول',
    activeClients: 'الموكلون النشطون', activeCases: 'الملفات النشطة', outstandingFees: 'الأتعاب المستحقة', upcomingHearings: 'الجلسات القادمة', addedThisMonth: 'تمت إضافة 2 هذا الشهر', openFiles: 'ملفات مفتوحة', pendingCollection: 'في انتظار التحصيل', next30Days: 'خلال 30 يوماً',
    priorityTasks: 'المهام ذات الأولوية', recentActivity: 'آخر الأنشطة', financeSnapshot: 'نظرة مالية', quickSummary: 'ملخص سريع',
    client: 'الموكل', case: 'الملف', status: 'الحالة', phone: 'الهاتف', email: 'البريد الإلكتروني', cin: 'رقم البطاقة الوطنية', address: 'العنوان', lastActivity: 'آخر نشاط', actions: 'إجراءات', view: 'عرض', back: 'رجوع', save: 'حفظ', cancel: 'إلغاء', close: 'إغلاق',
    name: 'الاسم', totalFees: 'مجموع الأتعاب', paidFees: 'الأتعاب المؤداة', balance: 'الباقي', notesLabel: 'ملاحظات', noClients: 'لم يتم العثور على موكلين', noClientsHint: 'جرّب كلمة بحث مختلفة.', clientProfile: 'ملف الموكل', contactInfo: 'معلومات التواصل', financialInfo: 'المعلومات المالية', relatedCases: 'الملفات المرتبطة', clientDocuments: 'وثائق الموكل',
    caseTitle: 'عنوان الملف', type: 'النوع', court: 'المحكمة', nextHearing: 'الجلسة القادمة', opened: 'تاريخ الفتح', description: 'الوصف', opponent: 'الخصم', lawyer: 'المحامي', hearings: 'الجلسات', caseTimeline: 'مسار الملف', noCases: 'لم يتم العثور على ملفات',
    fileName: 'اسم الملف', category: 'الفئة', size: 'الحجم', date: 'التاريخ', download: 'تحميل', noDocuments: 'لم يتم العثور على وثائق',
    scheduledHearings: 'الجلسات المبرمجة', pastHearings: 'الجلسات السابقة', outcome: 'النتيجة',
    totalInvoiced: 'إجمالي الفوترة', totalReceived: 'إجمالي المحصل', outstanding: 'المتبقي', collectionRate: 'نسبة التحصيل', allClients: 'جميع الموكلين', paymentsCollected: 'المبالغ المحصلة', ofTotalFees: 'من مجموع الأتعاب', overview: 'نظرة عامة', transactions: 'المعاملات', balances: 'الأرصدة', outstandingBalances: 'المبالغ المستحقة حسب الموكل', paid: 'مؤدى', due: 'مستحق', totalBilled: 'إجمالي الفوترة', amount: 'المبلغ', transactionType: 'نوع المعاملة',
    todo: 'للإنجاز', inProgress: 'قيد الإنجاز', done: 'منجز', moveTo: 'نقل إلى', priority: 'الأولوية', dueDate: 'الأجل',
    noteComposer: 'ملاحظات الملف', writeNote: 'اكتب ملاحظة...', attachTo: 'إرفاق بـ', addNote: 'إضافة ملاحظة',
    fullName: 'الاسم الكامل', enterClientName: 'أدخل الاسم الكامل للموكل', enterCin: 'أدخل رقم البطاقة الوطنية', enterPhone: 'أدخل رقم الهاتف', enterEmail: 'أدخل البريد الإلكتروني', enterAddress: 'أدخل العنوان', optionalNotes: 'ملاحظات اختيارية',
    selectClient: 'اختر الموكل', selectCase: 'اختر الملف', selectType: 'اختر النوع', enterCaseTitle: 'أدخل عنوان الملف', enterCourt: 'أدخل المحكمة', enterOpponent: 'أدخل الخصم', enterDescription: 'أدخل الوصف',
    taskTitle: 'عنوان المهمة', enterTaskTitle: 'أدخل عنوان المهمة', documentName: 'اسم الوثيقة', dragDrop: 'اسحب الملف وأفلته هنا', chooseFile: 'أو اختره من جهازك',
    createdClient: 'تمت إضافة الموكل بنجاح.', createdCase: 'تم فتح الملف بنجاح.', createdTask: 'تم إنشاء المهمة.', createdHearing: 'تمت برمجة الجلسة.', uploadedDoc: 'تم رفع الوثيقة.', recordedTransaction: 'تم تسجيل المعاملة.',
    active: 'نشط', pending: 'قيد الانتظار', closed: 'مغلق', urgent: 'مستعجل', civil: 'مدني', criminal: 'جنائي', commercial: 'تجاري', family: 'أسرة', property: 'عقاري', completed: 'منتهية', upcoming: 'قادمة', high: 'مرتفعة', normal: 'عادية', low: 'منخفضة', invoice: 'فاتورة', payment: 'أداء', expense: 'مصروف', outstandingStatus: 'غير مؤدى',
    monday: 'ن', tuesday: 'ث', wednesday: 'ر', thursday: 'خ', friday: 'ج', saturday: 'س', sunday: 'ح',
  },
};

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
];

const ICONS = {
  dash: '⊞', clients: '👤', cases: '⚖️', docs: '📁', calendar: '📅', finance: '💰', tasks: '✓', notes: '📝', settings: '⚙️',
  search: '🔍', add: '+', upload: '↑', download: '↓', pdf: '📄', docx: '📝', img: '🖼', call: '📞', email: '✉', note: '📌', invoice: '🧾', back: '←', close: '✕',
};

// ─── MOROCCAN MOCK DATA ─────────────────────────────────────────────────────
const CLIENTS = [
  { id: 1, name: 'Youssef Tazi', nationalId: 'BE123456', phone: '+212 6 98 76 54 32', email: 'youssef.tazi@example.com', address: 'Casablanca, Morocco', activeCases: 2, totalFees: 45000, paidFees: 32000, lastActivity: '2026-04-26', status: 'active', notes: 'Prefers morning calls.' },
  { id: 2, name: 'Salma Bennani', nationalId: 'AB654321', phone: '+212 6 12 34 56 78', email: 'salma.bennani@example.com', address: 'Rabat, Morocco', activeCases: 1, totalFees: 18500, paidFees: 18500, lastActivity: '2026-04-24', status: 'active', notes: '' },
  { id: 3, name: 'Omar El Mansouri', nationalId: 'CD987654', phone: '+212 6 55 66 77 88', email: 'omar.mansouri@example.com', address: 'Marrakech, Morocco', activeCases: 3, totalFees: 62000, paidFees: 40000, lastActivity: '2026-04-22', status: 'active', notes: 'High priority commercial matter.' },
  { id: 4, name: 'Nadia Alaoui', nationalId: 'EE456789', phone: '+212 6 10 98 76 54', email: 'nadia.alaoui@example.com', address: 'Fès, Morocco', activeCases: 0, totalFees: 12000, paidFees: 12000, lastActivity: '2026-04-12', status: 'closed', notes: '' },
  { id: 5, name: 'Hassan Berrada', nationalId: 'JK321987', phone: '+212 6 70 12 44 31', email: 'hassan.berrada@example.com', address: 'Tanger, Morocco', activeCases: 1, totalFees: 28000, paidFees: 14000, lastActivity: '2026-04-28', status: 'pending', notes: 'Waiting for missing property documents.' },
];

const CASES = [
  { id: 1, clientId: 1, title: 'Real Estate Ownership Dispute', type: 'property', status: 'active', court: 'Court of First Instance, Casablanca', opponent: 'Atlas Immo SARL', lawyer: 'Karim Amine', openDate: '2026-03-02', nextHearing: '2026-05-13', hearings: 3, description: 'Ownership dispute related to commercial property registration.' },
  { id: 2, clientId: 1, title: 'Debt Recovery Procedure', type: 'commercial', status: 'pending', court: 'Commercial Court, Casablanca', opponent: 'Nord Trading', lawyer: 'Karim Amine', openDate: '2026-04-01', nextHearing: '2026-05-20', hearings: 1, description: 'Debt recovery and enforcement file.' },
  { id: 3, clientId: 2, title: 'Family Support Agreement', type: 'family', status: 'active', court: 'Family Court, Rabat', opponent: 'Private', lawyer: 'Amina Idrissi', openDate: '2026-02-15', nextHearing: '2026-05-06', hearings: 2, description: 'Family support agreement and custody arrangements.' },
  { id: 4, clientId: 3, title: 'Commercial Contract Breach', type: 'commercial', status: 'urgent', court: 'Commercial Court, Marrakech', opponent: 'Marrakech Logistics', lawyer: 'Karim Amine', openDate: '2026-04-10', nextHearing: '2026-05-09', hearings: 1, description: 'Contract breach with urgent interim measures.' },
  { id: 5, clientId: 5, title: 'Partnership Dissolution', type: 'civil', status: 'active', court: 'Court of First Instance, Tangier', opponent: 'Former Partner', lawyer: 'Amina Idrissi', openDate: '2026-03-20', nextHearing: '2026-05-28', hearings: 2, description: 'Civil partnership dissolution and asset allocation.' },
];

const HEARINGS = [
  { id: 1, caseId: 1, title: 'Property Evidence Review', court: 'Court of First Instance, Casablanca', date: '2026-05-13', time: '10:30', status: 'upcoming', outcome: '' },
  { id: 2, caseId: 3, title: 'Family Mediation Session', court: 'Family Court, Rabat', date: '2026-05-06', time: '09:00', status: 'upcoming', outcome: '' },
  { id: 3, caseId: 4, title: 'Urgent Interim Measures', court: 'Commercial Court, Marrakech', date: '2026-05-09', time: '12:00', status: 'upcoming', outcome: '' },
  { id: 4, caseId: 2, title: 'Debt Recovery Filing', court: 'Commercial Court, Casablanca', date: '2026-04-17', time: '11:00', status: 'completed', outcome: 'Additional documents requested.' },
];

const TASKS = [
  { id: 1, caseId: 4, title: 'Prepare urgent motion draft', priority: 'urgent', due: '2026-05-05', status: 'todo' },
  { id: 2, caseId: 1, title: 'Review property deed and registration extract', priority: 'high', due: '2026-05-08', status: 'in-progress' },
  { id: 3, caseId: 3, title: 'Call client to confirm mediation documents', priority: 'normal', due: '2026-05-04', status: 'todo' },
  { id: 4, caseId: 2, title: 'Send invoice reminder', priority: 'low', due: '2026-05-11', status: 'done' },
];

const DOCS = [
  { id: 1, clientId: 1, caseId: 1, name: 'Property_Deed_Tazi.pdf', type: 'pdf', category: 'Evidence', date: '2026-04-20', size: '2.4 MB' },
  { id: 2, clientId: 4, caseId: null, name: 'Retainer_Agreement_Alaoui.docx', type: 'docx', category: 'Agreement', date: '2026-04-12', size: '420 KB' },
  { id: 3, clientId: 3, caseId: 4, name: 'Commercial_Contract.pdf', type: 'pdf', category: 'Contract', date: '2026-04-18', size: '1.7 MB' },
  { id: 4, clientId: 5, caseId: 5, name: 'Partnership_Statement.pdf', type: 'pdf', category: 'Evidence', date: '2026-04-25', size: '900 KB' },
];

const EXPENSES = [
  { id: 1, clientId: 1, caseId: 1, description: 'Initial consultation invoice', amount: 12000, date: '2026-03-05', type: 'invoice', status: 'completed' },
  { id: 2, clientId: 1, caseId: 1, description: 'Payment received', amount: 8000, date: '2026-03-08', type: 'payment', status: 'completed' },
  { id: 3, clientId: 3, caseId: 4, description: 'Urgent filing fees', amount: 4000, date: '2026-04-15', type: 'expense', status: 'completed' },
  { id: 4, clientId: 5, caseId: 5, description: 'Partnership dissolution invoice', amount: 14000, date: '2026-04-27', type: 'invoice', status: 'outstandingStatus' },
];

const ACTIVITIES = [
  { id: 1, clientId: 1, text: 'Phone call — discussed next hearing strategy', time: '2 hours ago', icon: ICONS.call },
  { id: 2, clientId: 1, text: 'Document uploaded: Property_Deed_Tazi.pdf', time: '1 day ago', icon: ICONS.docs },
  { id: 3, clientId: 3, text: 'Email sent — hearing schedule confirmed', time: '2 days ago', icon: ICONS.email },
  { id: 4, clientId: 5, text: 'Note added — urgent attention required', time: '3 days ago', icon: ICONS.note },
  { id: 5, clientId: 2, text: 'Invoice generated for family case', time: '4 days ago', icon: ICONS.invoice },
];

// ─── STYLE HELPERS ───────────────────────────────────────────────────────────
const cn = (...classes) => classes.filter(Boolean).join(' ');
const cardClass = 'rounded-2xl border border-law-border/80 bg-white shadow-sm shadow-black/5 dark:border-slate-800 dark:bg-slate-900';
const inputClass = 'w-full rounded-xl border border-law-border bg-white px-3 py-2 text-sm text-law-ink outline-none transition placeholder:text-law-muted focus:border-law-gold focus:ring-2 focus:ring-law-gold/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500';
const labelClass = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-law-muted dark:text-slate-400';
const thClass = 'bg-law-paper px-4 py-3 text-start text-[11px] font-semibold uppercase tracking-[0.14em] text-law-muted dark:bg-slate-950 dark:text-slate-400';
const tdClass = 'px-4 py-3 text-sm text-law-slate dark:text-slate-300';

const badgeStyles = {
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900',
  pending: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900',
  closed: 'bg-stone-100 text-stone-600 ring-stone-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700',
  urgent: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900',
  civil: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900',
  criminal: 'bg-red-50 text-red-800 ring-red-200 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900',
  commercial: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900',
  family: 'bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:ring-purple-900',
  property: 'bg-law-goldPale text-law-gold ring-law-gold/25 dark:bg-law-gold/15 dark:text-law-goldLight dark:ring-law-gold/30',
  upcoming: 'bg-law-goldPale text-law-gold ring-law-gold/25 dark:bg-law-gold/15 dark:text-law-goldLight dark:ring-law-gold/30',
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900',
  todo: 'bg-law-goldPale text-law-gold ring-law-gold/25 dark:bg-law-gold/15 dark:text-law-goldLight dark:ring-law-gold/30',
  'in-progress': 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900',
  done: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900',
  high: 'bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:ring-orange-900',
  normal: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900',
  low: 'bg-stone-100 text-stone-600 ring-stone-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700',
  invoice: 'bg-law-goldPale text-law-gold ring-law-gold/25 dark:bg-law-gold/15 dark:text-law-goldLight dark:ring-law-gold/30',
  payment: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900',
  expense: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900',
  outstandingStatus: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900',
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem(key) || initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try { localStorage.setItem(key, value); } catch { /* ignore */ }
  }, [key, value]);

  return [value, setValue];
}

function getLocale(lang) {
  return lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-MA' : 'en-US';
}

function fmtCurrency(value, lang) {
  return new Intl.NumberFormat(getLocale(lang), { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(value || 0);
}

function fmtDate(date, lang) {
  if (!date) return '—';
  return new Intl.DateTimeFormat(getLocale(lang), { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
}

function translateValue(t, value) {
  return t[value] || value;
}

function sortByDate(items, key = 'date') {
  return [...items].sort((a, b) => new Date(a[key]) - new Date(b[key]));
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function LawFirmApp() {
  const [lang, setLang] = useStoredState('lexis-language', 'ar');
  const [theme, setTheme] = useStoredState('lexis-theme', 'light');
  const [page, setPage] = useState('dashboard');
  const [clients, setClients] = useState(CLIENTS);
  const [cases, setCases] = useState(CASES);
  const [hearings, setHearings] = useState(HEARINGS);
  const [tasks, setTasks] = useState(TASKS);
  const [docs, setDocs] = useState(DOCS);
  const [expenses, setExpenses] = useState(EXPENSES);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');

  const t = STRINGS[lang] || STRINGS.en;
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [lang, isRtl, theme]);

  const navItems = useMemo(() => [
    { id: 'dashboard', label: t.dashboard, icon: ICONS.dash },
    { id: 'clients', label: t.clients, icon: ICONS.clients },
    { id: 'cases', label: t.cases, icon: ICONS.cases },
    { id: 'documents', label: t.documents, icon: ICONS.docs },
    { id: 'calendar', label: t.calendar, icon: ICONS.calendar },
    { id: 'finance', label: t.finance, icon: ICONS.finance },
    { id: 'tasks', label: t.tasks, icon: ICONS.tasks },
    { id: 'notes', label: t.notes, icon: ICONS.notes },
  ], [t]);

  const pageTitle = selectedClient?.name || selectedCase?.title || navItems.find((item) => item.id === page)?.label || t.dashboard;

  const showToast = useCallback((msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const closeModal = () => setModal(null);

  const addClient = (data) => {
    const newClient = { ...data, id: Date.now(), activeCases: 0, totalFees: 0, paidFees: 0, lastActivity: new Date().toISOString().slice(0, 10), status: 'active' };
    setClients((prev) => [newClient, ...prev]);
    showToast(t.createdClient);
    closeModal();
  };

  const addCase = (data) => {
    const newCase = { ...data, id: Date.now(), hearings: 0, openDate: new Date().toISOString().slice(0, 10), nextHearing: data.nextHearing || '' };
    setCases((prev) => [newCase, ...prev]);
    showToast(t.createdCase);
    closeModal();
  };

  const addTask = (data) => {
    setTasks((prev) => [{ ...data, id: Date.now(), status: 'todo' }, ...prev]);
    showToast(t.createdTask);
    closeModal();
  };

  const addHearing = (data) => {
    setHearings((prev) => [{ ...data, id: Date.now(), status: 'upcoming', outcome: '' }, ...prev]);
    showToast(t.createdHearing);
    closeModal();
  };

  const moveTask = (id, status) => setTasks((prev) => prev.map((task) => task.id === id ? { ...task, status } : task));

  const setPageAndReset = (id) => {
    setPage(id);
    setSelectedClient(null);
    setSelectedCase(null);
    setSearch('');
  };

  return (
    <div className={cn('flex h-screen overflow-hidden bg-law-paper text-law-ink antialiased transition-colors dark:bg-slate-950 dark:text-slate-100', isRtl && 'font-arabic')}>
      <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-e border-black/10 bg-law-ink text-white md:flex dark:border-slate-800 dark:bg-black">
        <div className="border-b border-white/10 px-6 py-7">
          <h1 className="font-serif text-2xl text-law-gold">{t.appName}</h1>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">{t.appTagline}</p>
        </div>

        <nav className="flex-1 py-4">
          <p className="px-6 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">{t.navigation}</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPageAndReset(item.id)}
              className={cn(
                'flex w-full items-center gap-3 border-s-4 px-6 py-3 text-start text-sm transition',
                page === item.id
                  ? 'border-law-gold bg-law-gold/10 text-law-gold'
                  : 'border-transparent text-white/55 hover:bg-white/5 hover:text-white/85'
              )}
            >
              <span className="w-5 text-center text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <p className="px-6 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">{t.system}</p>
          <button className="flex w-full items-center gap-3 border-s-4 border-transparent px-6 py-3 text-start text-sm text-white/55 transition hover:bg-white/5 hover:text-white/85">
            <span className="w-5 text-center text-base">{ICONS.settings}</span>
            <span>{t.settings}</span>
          </button>
        </nav>

        <div className="border-t border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-law-gold text-sm font-bold text-law-ink">KA</div>
            <div>
              <p className="text-sm font-semibold text-white/90">Karim Amine</p>
              <p className="text-xs text-white/40">{t.leadAttorney}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex min-h-20 items-center gap-4 border-b border-law-border bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 lg:px-7">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-law-muted dark:text-slate-400">{t.appTagline}</p>
            <h2 className="truncate font-serif text-2xl text-law-ink dark:text-white">{pageTitle}</h2>
          </div>

          <div className="hidden max-w-sm flex-1 md:block">
            <SearchBox value={search} setValue={setSearch} placeholder={t.searchPlaceholder} />
          </div>

          <select
            aria-label={t.language}
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="rounded-xl border border-law-border bg-law-paper px-3 py-2 text-sm text-law-slate outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
          >
            {LANGUAGES.map((language) => <option key={language.code} value={language.code}>{language.label}</option>)}
          </select>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-xl border border-law-border bg-law-paper px-3 py-2 text-sm font-semibold text-law-slate transition hover:border-law-gold dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
          >
            {theme === 'dark' ? `☀ ${t.lightMode}` : `☾ ${t.darkMode}`}
          </button>

          <TopAction page={page} selectedClient={selectedClient} selectedCase={selectedCase} setModal={setModal} t={t} />
        </header>

        <div className="border-b border-law-border bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 md:hidden">
          <SearchBox value={search} setValue={setSearch} placeholder={t.searchPlaceholder} />
        </div>

        <section className="flex-1 overflow-y-auto p-4 lg:p-7">
          {page === 'dashboard' && <Dashboard clients={clients} cases={cases} tasks={tasks} hearings={hearings} expenses={expenses} activities={ACTIVITIES} lang={lang} t={t} />}
          {page === 'clients' && !selectedClient && <ClientsPage clients={clients} search={search} onSelect={setSelectedClient} lang={lang} t={t} />}
          {page === 'clients' && selectedClient && <ClientDetail client={selectedClient} cases={cases} docs={docs} activities={ACTIVITIES} expenses={expenses} onBack={() => setSelectedClient(null)} lang={lang} t={t} />}
          {page === 'cases' && !selectedCase && <CasesPage cases={cases} clients={clients} search={search} onSelect={setSelectedCase} lang={lang} t={t} />}
          {page === 'cases' && selectedCase && <CaseDetail caseItem={selectedCase} clients={clients} hearings={hearings} docs={docs} onBack={() => setSelectedCase(null)} lang={lang} t={t} />}
          {page === 'documents' && <DocumentsPage docs={docs} cases={cases} clients={clients} search={search} lang={lang} t={t} />}
          {page === 'calendar' && <CalendarPage hearings={hearings} cases={cases} lang={lang} t={t} />}
          {page === 'finance' && <FinancePage clients={clients} expenses={expenses} lang={lang} t={t} />}
          {page === 'tasks' && <TasksPage tasks={tasks} cases={cases} onMove={moveTask} lang={lang} t={t} />}
          {page === 'notes' && <NotesPage clients={clients} cases={cases} t={t} />}
        </section>
      </main>

      {modal?.type === 'add-client' && <AddClientModal onClose={closeModal} onSave={addClient} t={t} />}
      {modal?.type === 'add-case' && <AddCaseModal onClose={closeModal} onSave={addCase} clients={clients} t={t} />}
      {modal?.type === 'add-task' && <AddTaskModal onClose={closeModal} onSave={addTask} cases={cases} t={t} />}
      {modal?.type === 'add-hearing' && <AddHearingModal onClose={closeModal} onSave={addHearing} cases={cases} t={t} />}
      {modal?.type === 'upload-doc' && <UploadDocModal onClose={closeModal} onSave={(doc) => { setDocs((prev) => [{ ...doc, id: Date.now() }, ...prev]); showToast(t.uploadedDoc); closeModal(); }} cases={cases} clients={clients} t={t} />}
      {modal?.type === 'add-expense' && <AddExpenseModal onClose={closeModal} onSave={(item) => { setExpenses((prev) => [{ ...item, id: Date.now() }, ...prev]); showToast(t.recordedTransaction); closeModal(); }} clients={clients} cases={cases} t={t} />}

      {toast && <div className="fixed bottom-6 end-6 z-50 max-w-sm rounded-xl border-s-4 border-law-gold bg-law-ink px-5 py-3 text-sm font-medium text-white shadow-soft dark:bg-black">{toast}</div>}
    </div>
  );
}

function TopAction({ page, selectedClient, selectedCase, setModal, t }) {
  const actions = {
    clients: !selectedClient && { label: t.addClient, type: 'add-client', icon: ICONS.add },
    cases: !selectedCase && { label: t.openCase, type: 'add-case', icon: ICONS.add },
    tasks: { label: t.newTask, type: 'add-task', icon: ICONS.add },
    calendar: { label: t.scheduleHearing, type: 'add-hearing', icon: ICONS.add },
    documents: { label: t.uploadDocument, type: 'upload-doc', icon: ICONS.upload },
    finance: { label: t.recordTransaction, type: 'add-expense', icon: ICONS.add },
  };
  const action = actions[page];
  if (!action) return null;
  return <Button onClick={() => setModal({ type: action.type })}>{action.icon} {action.label}</Button>;
}

// ─── REUSABLE UI ─────────────────────────────────────────────────────────────
function Button({ children, onClick, variant = 'primary', type = 'button', className = '', disabled = false }) {
  const styles = {
    primary: 'bg-law-ink text-white hover:bg-law-slate dark:bg-law-gold dark:text-law-ink dark:hover:bg-law-goldLight',
    gold: 'bg-law-gold text-white hover:bg-law-goldLight',
    ghost: 'border border-law-border bg-transparent text-law-slate hover:bg-law-cream dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800',
    danger: 'bg-law-danger text-white hover:bg-red-700',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn('inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60', styles[variant], className)}
    >
      {children}
    </button>
  );
}

function Card({ title, children, action, className = '' }) {
  return (
    <div className={cn(cardClass, 'p-5', className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h3 className="font-serif text-xl text-law-ink dark:text-white">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

function SearchBox({ value, setValue, placeholder }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-sm text-law-muted">{ICONS.search}</span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-xl border border-law-border bg-law-paper py-2 pe-3 ps-10 text-sm text-law-ink outline-none transition placeholder:text-law-muted focus:border-law-gold focus:bg-white focus:ring-2 focus:ring-law-gold/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:bg-slate-950"
        placeholder={placeholder}
      />
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className={cn(cardClass, 'relative overflow-hidden p-5')}>
      <div className="absolute inset-x-0 top-0 h-1 bg-law-gold" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-law-muted dark:text-slate-400">{label}</p>
      <p className="mt-2 font-serif text-4xl leading-none text-law-ink dark:text-white">{value}</p>
      <p className="mt-1 text-xs text-law-muted dark:text-slate-400">{sub}</p>
    </div>
  );
}

function Badge({ value, t }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset', badgeStyles[value] || badgeStyles.closed)}>
      {translateValue(t, value)}
    </span>
  );
}

function EmptyState({ icon, title, hint }) {
  return (
    <div className="py-14 text-center text-law-muted dark:text-slate-400">
      <div className="mb-3 text-4xl">{icon}</div>
      <h3 className="font-serif text-xl text-law-slate dark:text-slate-200">{title}</h3>
      <p className="mt-1 text-sm">{hint}</p>
    </div>
  );
}

function Modal({ title, children, onClose, footer }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-law-border px-6 py-4 dark:border-slate-800">
          <h3 className="font-serif text-2xl text-law-ink dark:text-white">{title}</h3>
          <button onClick={onClose} className="rounded-full px-2 py-1 text-xl text-law-muted transition hover:bg-law-cream hover:text-law-ink dark:hover:bg-slate-800 dark:hover:text-white">{ICONS.close}</button>
        </div>
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-3 border-t border-law-border px-6 py-4 dark:border-slate-800">{footer}</div>}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return <label className="block"><span className={labelClass}>{label}</span>{children}</label>;
}

function Input({ value, onChange, placeholder, type = 'text', required = false }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={type} required={required} className={inputClass} />;
}

function TextArea({ value, onChange, placeholder }) {
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cn(inputClass, 'min-h-24 resize-y')} />;
}

function Select({ value, onChange, children, required = false }) {
  return <select value={value} onChange={(e) => onChange(e.target.value)} required={required} className={inputClass}>{children}</select>;
}

// ─── PAGES ───────────────────────────────────────────────────────────────────
function Dashboard({ clients, cases, tasks, hearings, expenses, activities, lang, t }) {
  const totalOwed = clients.reduce((sum, client) => sum + (client.totalFees - client.paidFees), 0);
  const totalInvoiced = clients.reduce((sum, client) => sum + client.totalFees, 0);
  const totalPaid = clients.reduce((sum, client) => sum + client.paidFees, 0);
  const upcoming = sortByDate(hearings.filter((h) => h.status === 'upcoming')).slice(0, 3);
  const priority = tasks.filter((task) => ['urgent', 'high'].includes(task.priority)).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t.activeClients} value={clients.filter((c) => c.status === 'active').length} sub={t.addedThisMonth} />
        <StatCard label={t.activeCases} value={cases.filter((c) => c.status !== 'closed').length} sub={t.openFiles} />
        <StatCard label={t.outstandingFees} value={fmtCurrency(totalOwed, lang)} sub={t.pendingCollection} />
        <StatCard label={t.upcomingHearings} value={hearings.filter((h) => h.status === 'upcoming').length} sub={t.next30Days} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title={t.upcomingHearings}>
          <div className="space-y-3">
            {upcoming.map((hearing) => {
              const caseItem = cases.find((c) => c.id === hearing.caseId);
              return (
                <div key={hearing.id} className="flex items-start justify-between gap-4 rounded-xl border border-law-border p-3 dark:border-slate-800">
                  <div>
                    <p className="font-semibold text-law-ink dark:text-white">{hearing.title}</p>
                    <p className="mt-1 text-sm text-law-muted dark:text-slate-400">{hearing.court}</p>
                    <p className="mt-1 text-sm font-semibold text-law-gold">{fmtDate(hearing.date, lang)} · {hearing.time}</p>
                  </div>
                  {caseItem && <Badge value={caseItem.type} t={t} />}
                </div>
              );
            })}
          </div>
        </Card>

        <Card title={t.priorityTasks}>
          <div className="space-y-3">
            {priority.map((task) => (
              <div key={task.id} className="rounded-xl border border-law-border p-3 dark:border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-law-ink dark:text-white">{task.title}</p>
                  <Badge value={task.priority} t={t} />
                </div>
                <p className="mt-2 text-sm text-law-muted dark:text-slate-400">{t.dueDate}: {fmtDate(task.due, lang)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title={t.recentActivity} className="xl:col-span-2">
          <div className="divide-y divide-law-border dark:divide-slate-800">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-law-goldPale text-sm dark:bg-law-gold/15">{activity.icon}</div>
                <div>
                  <p className="text-sm text-law-slate dark:text-slate-300">{activity.text}</p>
                  <p className="mt-1 text-xs text-law-muted dark:text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t.financeSnapshot}>
          <div className="space-y-4">
            <FinanceLine label={t.totalInvoiced} value={fmtCurrency(totalInvoiced, lang)} />
            <FinanceLine label={t.totalReceived} value={fmtCurrency(totalPaid, lang)} tone="success" />
            <FinanceLine label={t.outstanding} value={fmtCurrency(totalOwed, lang)} tone="danger" />
            <div className="h-2 overflow-hidden rounded-full bg-law-cream dark:bg-slate-800">
              <div className="h-full rounded-full bg-law-gold" style={{ width: `${Math.round((totalPaid / totalInvoiced) * 100)}%` }} />
            </div>
            <p className="text-xs text-law-muted dark:text-slate-400">{Math.round((totalPaid / totalInvoiced) * 100)}% {t.ofTotalFees}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function FinanceLine({ label, value, tone }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-law-muted dark:text-slate-400">{label}</span>
      <span className={cn('font-semibold', tone === 'success' && 'text-law-success dark:text-emerald-300', tone === 'danger' && 'text-law-danger dark:text-red-300')}>{value}</span>
    </div>
  );
}

function ClientsPage({ clients, search, onSelect, lang, t }) {
  const filtered = clients.filter((client) => [client.name, client.email, client.phone, client.nationalId].join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    <Card title={t.clients}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead><tr><th className={thClass}>{t.name}</th><th className={thClass}>{t.phone}</th><th className={thClass}>{t.cin}</th><th className={thClass}>{t.status}</th><th className={thClass}>{t.balance}</th><th className={thClass}>{t.lastActivity}</th><th className={thClass}>{t.actions}</th></tr></thead>
          <tbody className="divide-y divide-law-border dark:divide-slate-800">
            {filtered.map((client) => (
              <tr key={client.id} className="transition hover:bg-law-goldPale/60 dark:hover:bg-slate-800/70">
                <td className={cn(tdClass, 'font-semibold text-law-ink dark:text-white')}>{client.name}<p className="text-xs font-normal text-law-muted dark:text-slate-500">{client.email}</p></td>
                <td className={tdClass}>{client.phone}</td>
                <td className={tdClass}>{client.nationalId}</td>
                <td className={tdClass}><Badge value={client.status} t={t} /></td>
                <td className={cn(tdClass, 'font-semibold')}>{fmtCurrency(client.totalFees - client.paidFees, lang)}</td>
                <td className={tdClass}>{fmtDate(client.lastActivity, lang)}</td>
                <td className={tdClass}><Button variant="ghost" className="px-3 py-1.5" onClick={() => onSelect(client)}>{t.view}</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyState icon={ICONS.clients} title={t.noClients} hint={t.noClientsHint} />}
      </div>
    </Card>
  );
}

function ClientDetail({ client, cases, docs, activities, expenses, onBack, lang, t }) {
  const clientCases = cases.filter((c) => c.clientId === client.id);
  const clientDocs = docs.filter((doc) => doc.clientId === client.id);
  const balance = client.totalFees - client.paidFees;
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>{ICONS.back} {t.back}</Button>
      <div className="overflow-hidden rounded-2xl border border-law-border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="bg-law-ink px-6 py-6 text-white dark:bg-black">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl text-law-gold">{client.name}</h2>
              <p className="mt-1 text-sm text-white/55">{t.cin}: {client.nationalId}</p>
            </div>
            <Badge value={client.status} t={t} />
          </div>
        </div>
        <div className="grid divide-y divide-law-border dark:divide-slate-800 lg:grid-cols-3 lg:divide-x lg:divide-y-0 rtl:lg:divide-x-reverse">
          <InfoPanel title={t.contactInfo} items={[[t.phone, client.phone], [t.email, client.email], [t.address, client.address]]} />
          <InfoPanel title={t.financialInfo} items={[[t.totalFees, fmtCurrency(client.totalFees, lang)], [t.paidFees, fmtCurrency(client.paidFees, lang)], [t.balance, fmtCurrency(balance, lang)]]} />
          <InfoPanel title={t.notesLabel} items={[[t.notesLabel, client.notes || '—']]} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title={t.relatedCases}>
          <div className="space-y-3">
            {clientCases.map((caseItem) => (
              <div key={caseItem.id} className="rounded-xl border border-law-border p-3 dark:border-slate-800">
                <div className="flex items-start justify-between gap-3"><p className="font-semibold text-law-ink dark:text-white">{caseItem.title}</p><Badge value={caseItem.type} t={t} /></div>
                <p className="mt-1 text-sm text-law-muted dark:text-slate-400">{caseItem.court}</p>
                <p className="mt-1 text-sm text-law-gold">{t.nextHearing}: {fmtDate(caseItem.nextHearing, lang)}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card title={t.clientDocuments}>
          <div className="divide-y divide-law-border dark:divide-slate-800">
            {clientDocs.map((doc) => <DocumentRow key={doc.id} doc={doc} t={t} lang={lang} />)}
          </div>
        </Card>
      </div>

      <Card title={t.recentActivity}>
        <div className="grid gap-3 md:grid-cols-2">
          {activities.filter((a) => a.clientId === client.id).map((activity) => (
            <div key={activity.id} className="rounded-xl border border-law-border p-3 dark:border-slate-800">
              <p className="text-sm text-law-slate dark:text-slate-300">{activity.text}</p>
              <p className="mt-1 text-xs text-law-muted dark:text-slate-500">{activity.time}</p>
            </div>
          ))}
          {expenses.filter((e) => e.clientId === client.id).map((expense) => (
            <div key={`e-${expense.id}`} className="rounded-xl border border-law-border p-3 dark:border-slate-800">
              <p className="text-sm font-semibold text-law-ink dark:text-white">{expense.description}</p>
              <p className="mt-1 text-sm text-law-gold">{fmtCurrency(expense.amount, lang)} · {fmtDate(expense.date, lang)}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function InfoPanel({ title, items }) {
  return (
    <div className="p-5">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-law-muted dark:text-slate-400">{title}</p>
      <div className="space-y-3">
        {items.map(([label, value]) => (
          <div key={label}>
            <p className="text-xs uppercase tracking-[0.12em] text-law-muted dark:text-slate-500">{label}</p>
            <p className="mt-1 text-sm font-medium text-law-ink dark:text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CasesPage({ cases, clients, search, onSelect, lang, t }) {
  const getClient = (id) => clients.find((client) => client.id === id);
  const filtered = cases.filter((caseItem) => [caseItem.title, caseItem.court, caseItem.opponent, getClient(caseItem.clientId)?.name].join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    <Card title={t.cases}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead><tr><th className={thClass}>{t.caseTitle}</th><th className={thClass}>{t.client}</th><th className={thClass}>{t.type}</th><th className={thClass}>{t.status}</th><th className={thClass}>{t.court}</th><th className={thClass}>{t.nextHearing}</th><th className={thClass}>{t.actions}</th></tr></thead>
          <tbody className="divide-y divide-law-border dark:divide-slate-800">
            {filtered.map((caseItem) => (
              <tr key={caseItem.id} className="transition hover:bg-law-goldPale/60 dark:hover:bg-slate-800/70">
                <td className={cn(tdClass, 'font-semibold text-law-ink dark:text-white')}>{caseItem.title}</td>
                <td className={tdClass}>{getClient(caseItem.clientId)?.name}</td>
                <td className={tdClass}><Badge value={caseItem.type} t={t} /></td>
                <td className={tdClass}><Badge value={caseItem.status} t={t} /></td>
                <td className={tdClass}>{caseItem.court}</td>
                <td className={tdClass}>{fmtDate(caseItem.nextHearing, lang)}</td>
                <td className={tdClass}><Button variant="ghost" className="px-3 py-1.5" onClick={() => onSelect(caseItem)}>{t.view}</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyState icon={ICONS.cases} title={t.noCases} hint={t.noClientsHint} />}
      </div>
    </Card>
  );
}

function CaseDetail({ caseItem, clients, hearings, docs, onBack, lang, t }) {
  const client = clients.find((c) => c.id === caseItem.clientId);
  const caseHearings = hearings.filter((h) => h.caseId === caseItem.id);
  const caseDocs = docs.filter((doc) => doc.caseId === caseItem.id);
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>{ICONS.back} {t.back}</Button>
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-law-ink dark:text-white">{caseItem.title}</h2>
            <p className="mt-2 text-sm text-law-muted dark:text-slate-400">{caseItem.description}</p>
          </div>
          <div className="flex gap-2"><Badge value={caseItem.type} t={t} /><Badge value={caseItem.status} t={t} /></div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MiniInfo label={t.client} value={client?.name || '—'} />
          <MiniInfo label={t.court} value={caseItem.court} />
          <MiniInfo label={t.opponent} value={caseItem.opponent} />
          <MiniInfo label={t.nextHearing} value={fmtDate(caseItem.nextHearing, lang)} />
        </div>
      </Card>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card title={t.hearings}>
          <div className="space-y-3">{caseHearings.map((h) => <HearingRow key={h.id} hearing={h} lang={lang} t={t} />)}</div>
        </Card>
        <Card title={t.documents}>
          <div className="divide-y divide-law-border dark:divide-slate-800">{caseDocs.map((doc) => <DocumentRow key={doc.id} doc={doc} lang={lang} t={t} />)}</div>
        </Card>
      </div>
    </div>
  );
}

function MiniInfo({ label, value }) {
  return (
    <div className="rounded-xl border border-law-border bg-law-paper p-4 dark:border-slate-800 dark:bg-slate-950">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-law-muted dark:text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-law-ink dark:text-white">{value}</p>
    </div>
  );
}

function DocumentsPage({ docs, cases, clients, search, lang, t }) {
  const getCase = (id) => cases.find((caseItem) => caseItem.id === id);
  const getClient = (id) => clients.find((client) => client.id === id);
  const filtered = docs.filter((doc) => [doc.name, doc.category, getClient(doc.clientId)?.name, getCase(doc.caseId)?.title].join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    <Card title={t.documents}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead><tr><th className={thClass}>{t.fileName}</th><th className={thClass}>{t.client}</th><th className={thClass}>{t.case}</th><th className={thClass}>{t.category}</th><th className={thClass}>{t.date}</th><th className={thClass}>{t.size}</th><th className={thClass}>{t.actions}</th></tr></thead>
          <tbody className="divide-y divide-law-border dark:divide-slate-800">
            {filtered.map((doc) => (
              <tr key={doc.id} className="transition hover:bg-law-goldPale/60 dark:hover:bg-slate-800/70">
                <td className={cn(tdClass, 'font-semibold text-law-ink dark:text-white')}><span className="me-2">{doc.type === 'pdf' ? ICONS.pdf : ICONS.docx}</span>{doc.name}</td>
                <td className={tdClass}>{getClient(doc.clientId)?.name}</td>
                <td className={tdClass}>{getCase(doc.caseId)?.title || '—'}</td>
                <td className={tdClass}>{doc.category}</td>
                <td className={tdClass}>{fmtDate(doc.date, lang)}</td>
                <td className={tdClass}>{doc.size}</td>
                <td className={tdClass}><Button variant="ghost" className="px-3 py-1.5">{t.download}</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyState icon={ICONS.docs} title={t.noDocuments} hint={t.noClientsHint} />}
      </div>
    </Card>
  );
}

function DocumentRow({ doc, lang, t }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div>
        <p className="font-semibold text-law-ink dark:text-white"><span className="me-2">{doc.type === 'pdf' ? ICONS.pdf : ICONS.docx}</span>{doc.name}</p>
        <p className="mt-1 text-xs text-law-muted dark:text-slate-500">{doc.category} · {fmtDate(doc.date, lang)} · {doc.size}</p>
      </div>
      <Button variant="ghost" className="px-3 py-1.5">{t.download}</Button>
    </div>
  );
}

function CalendarPage({ hearings, cases, lang, t }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1));
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = new Intl.DateTimeFormat(getLocale(lang), { month: 'long', year: 'numeric' }).format(currentDate);
  const hearingDates = hearings.map((h) => Number(h.date.split('-')[2]));
  const today = new Date();
  const weekdays = [t.sunday, t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday];
  const upcomingList = sortByDate(hearings.filter((h) => h.status === 'upcoming'));
  const pastList = sortByDate(hearings.filter((h) => h.status === 'completed'));

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card title={monthName} action={<div className="flex gap-2"><Button variant="ghost" className="px-3 py-1.5" onClick={() => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1))}>‹</Button><Button variant="ghost" className="px-3 py-1.5" onClick={() => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1))}>›</Button></div>}>
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((day) => <div key={day} className="py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-law-muted dark:text-slate-400">{day}</div>)}
          {Array.from({ length: firstDay }).map((_, index) => <div key={`empty-${index}`} />)}
          {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
            const isToday = day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
            const hasEvent = hearingDates.includes(day);
            return (
              <div key={day} className={cn('flex aspect-square min-h-12 flex-col items-center justify-start rounded-xl p-2 text-sm transition hover:bg-law-cream dark:hover:bg-slate-800', isToday && 'bg-law-goldPale font-bold text-law-gold dark:bg-law-gold/15')}>
                <span>{day}</span>
                {hasEvent && <span className="mt-1 h-1.5 w-1.5 rounded-full bg-law-gold" />}
              </div>
            );
          })}
        </div>
      </Card>

      <Card title={t.scheduledHearings}>
        <div className="space-y-3">
          {upcomingList.map((h) => <HearingRow key={h.id} hearing={h} caseItem={cases.find((c) => c.id === h.caseId)} lang={lang} t={t} />)}
        </div>
        {pastList.length > 0 && <h4 className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-law-muted dark:text-slate-400">{t.pastHearings}</h4>}
        <div className="mt-3 space-y-3">
          {pastList.map((h) => <HearingRow key={h.id} hearing={h} caseItem={cases.find((c) => c.id === h.caseId)} lang={lang} t={t} muted />)}
        </div>
      </Card>
    </div>
  );
}

function HearingRow({ hearing, caseItem, lang, t, muted = false }) {
  return (
    <div className={cn('rounded-xl border border-law-border p-3 dark:border-slate-800', muted && 'opacity-70')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-law-ink dark:text-white">{hearing.title}</p>
          <p className="mt-1 text-sm text-law-muted dark:text-slate-400">{hearing.court}</p>
          <p className="mt-1 text-sm font-semibold text-law-gold">{fmtDate(hearing.date, lang)} · {hearing.time}</p>
          {hearing.outcome && <p className="mt-2 text-sm italic text-law-slate dark:text-slate-300">{t.outcome}: {hearing.outcome}</p>}
        </div>
        {caseItem && <Badge value={caseItem.type} t={t} />}
      </div>
    </div>
  );
}

function FinancePage({ clients, expenses, lang, t }) {
  const [tab, setTab] = useState('overview');
  const totalInvoiced = clients.reduce((sum, client) => sum + client.totalFees, 0);
  const totalPaid = clients.reduce((sum, client) => sum + client.paidFees, 0);
  const totalOwed = totalInvoiced - totalPaid;
  const tabs = [{ id: 'overview', label: t.overview }, { id: 'transactions', label: t.transactions }, { id: 'balances', label: t.balances }];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t.totalInvoiced} value={fmtCurrency(totalInvoiced, lang)} sub={t.allClients} />
        <StatCard label={t.totalReceived} value={fmtCurrency(totalPaid, lang)} sub={t.paymentsCollected} />
        <StatCard label={t.outstanding} value={fmtCurrency(totalOwed, lang)} sub={t.pendingCollection} />
        <StatCard label={t.collectionRate} value={`${Math.round((totalPaid / totalInvoiced) * 100)}%`} sub={t.ofTotalFees} />
      </div>

      <Card>
        <div className="mb-5 flex border-b border-law-border dark:border-slate-800">
          {tabs.map((item) => (
            <button key={item.id} onClick={() => setTab(item.id)} className={cn('border-b-2 px-5 py-3 text-sm font-semibold transition', tab === item.id ? 'border-law-gold text-law-ink dark:text-white' : 'border-transparent text-law-muted hover:text-law-ink dark:hover:text-slate-200')}>{item.label}</button>
          ))}
        </div>
        {tab === 'overview' && <FinanceOverview clients={clients} lang={lang} t={t} />}
        {tab === 'transactions' && <TransactionsTable expenses={expenses} clients={clients} lang={lang} t={t} />}
        {tab === 'balances' && <BalancesTable clients={clients} lang={lang} t={t} />}
      </Card>
    </div>
  );
}

function FinanceOverview({ clients, lang, t }) {
  return (
    <div>
      <h4 className="mb-4 font-serif text-xl text-law-ink dark:text-white">{t.outstandingBalances}</h4>
      <div className="space-y-5">
        {clients.filter((c) => c.totalFees > c.paidFees).map((client) => {
          const pct = Math.round((client.paidFees / client.totalFees) * 100);
          return (
            <div key={client.id}>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-law-ink dark:text-white">{client.name}</p>
                <p className="text-sm"><span className="text-law-success dark:text-emerald-300">{t.paid}: {fmtCurrency(client.paidFees, lang)}</span><span className="mx-2 text-law-muted">·</span><span className="text-law-danger dark:text-red-300">{t.due}: {fmtCurrency(client.totalFees - client.paidFees, lang)}</span></p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-law-cream dark:bg-slate-800"><div className="h-full rounded-full bg-law-gold" style={{ width: `${pct}%` }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TransactionsTable({ expenses, clients, lang, t }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse"><thead><tr><th className={thClass}>{t.description}</th><th className={thClass}>{t.client}</th><th className={thClass}>{t.type}</th><th className={thClass}>{t.amount}</th><th className={thClass}>{t.date}</th><th className={thClass}>{t.status}</th></tr></thead>
        <tbody className="divide-y divide-law-border dark:divide-slate-800">
          {expenses.map((expense) => <tr key={expense.id} className="hover:bg-law-goldPale/60 dark:hover:bg-slate-800/70"><td className={cn(tdClass, 'font-semibold text-law-ink dark:text-white')}>{expense.description}</td><td className={tdClass}>{clients.find((c) => c.id === expense.clientId)?.name}</td><td className={tdClass}><Badge value={expense.type} t={t} /></td><td className={cn(tdClass, expense.type === 'payment' ? 'font-semibold text-law-success dark:text-emerald-300' : 'font-semibold')}>{fmtCurrency(expense.amount, lang)}</td><td className={tdClass}>{fmtDate(expense.date, lang)}</td><td className={tdClass}><Badge value={expense.status} t={t} /></td></tr>)}
        </tbody></table>
    </div>
  );
}

function BalancesTable({ clients, lang, t }) {
  return (
    <div className="overflow-x-auto"><table className="w-full border-collapse"><thead><tr><th className={thClass}>{t.client}</th><th className={thClass}>{t.totalBilled}</th><th className={thClass}>{t.paid}</th><th className={thClass}>{t.outstanding}</th><th className={thClass}>{t.status}</th></tr></thead>
      <tbody className="divide-y divide-law-border dark:divide-slate-800">{clients.map((client) => {
        const owed = client.totalFees - client.paidFees;
        return <tr key={client.id} className="hover:bg-law-goldPale/60 dark:hover:bg-slate-800/70"><td className={cn(tdClass, 'font-semibold text-law-ink dark:text-white')}>{client.name}</td><td className={tdClass}>{fmtCurrency(client.totalFees, lang)}</td><td className={cn(tdClass, 'text-law-success dark:text-emerald-300')}>{fmtCurrency(client.paidFees, lang)}</td><td className={cn(tdClass, owed > 0 ? 'font-semibold text-law-danger dark:text-red-300' : 'text-law-success dark:text-emerald-300')}>{owed > 0 ? fmtCurrency(owed, lang) : '—'}</td><td className={tdClass}><Badge value={owed > 0 ? 'pending' : 'active'} t={t} /></td></tr>;
      })}</tbody></table></div>
  );
}

function TasksPage({ tasks, cases, onMove, lang, t }) {
  const columns = [{ id: 'todo', label: t.todo }, { id: 'in-progress', label: t.inProgress }, { id: 'done', label: t.done }];
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      {columns.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.id);
        return (
          <div key={column.id} className="rounded-2xl bg-law-cream p-4 dark:bg-slate-900/70">
            <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-bold uppercase tracking-[0.16em] text-law-muted dark:text-slate-400">{column.label}</h3><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-law-slate dark:bg-slate-800 dark:text-slate-200">{columnTasks.length}</span></div>
            <div className="space-y-3">
              {columnTasks.map((task) => {
                const caseItem = cases.find((c) => c.id === task.caseId);
                return (
                  <div key={task.id} className="rounded-2xl border border-law-border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <div className="flex items-start justify-between gap-3"><p className="font-semibold text-law-ink dark:text-white">{task.title}</p><Badge value={task.priority} t={t} /></div>
                    <p className="mt-2 text-xs text-law-muted dark:text-slate-500">{caseItem?.title}</p>
                    <p className="mt-1 text-xs font-semibold text-law-gold">{t.dueDate}: {fmtDate(task.due, lang)}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {columns.filter((c) => c.id !== task.status).map((target) => <Button key={target.id} variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => onMove(task.id, target.id)}>{t.moveTo} {target.label}</Button>)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function NotesPage({ clients, cases, t }) {
  const [note, setNote] = useState('');
  const [target, setTarget] = useState('general');
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card title={t.noteComposer}>
        <div className="space-y-4">
          <Field label={t.attachTo}><Select value={target} onChange={setTarget}><option value="general">General</option>{clients.map((client) => <option key={`c-${client.id}`} value={`client-${client.id}`}>{client.name}</option>)}{cases.map((caseItem) => <option key={`case-${caseItem.id}`} value={`case-${caseItem.id}`}>{caseItem.title}</option>)}</Select></Field>
          <Field label={t.notesLabel}><TextArea value={note} onChange={setNote} placeholder={t.writeNote} /></Field>
          <Button onClick={() => setNote('')}>{t.addNote}</Button>
        </div>
      </Card>
      <Card title={t.quickSummary}>
        <div className="space-y-3 text-sm text-law-slate dark:text-slate-300">
          <p>• {clients.length} {t.clients}</p>
          <p>• {cases.filter((c) => c.status !== 'closed').length} {t.activeCases}</p>
          <p>• {cases.filter((c) => c.status === 'urgent').length} {t.urgent}</p>
          <p>• {target !== 'general' ? `${t.attachTo}: ${target}` : t.notesLabel}</p>
        </div>
      </Card>
    </div>
  );
}

// ─── MODALS ──────────────────────────────────────────────────────────────────
function AddClientModal({ onClose, onSave, t }) {
  const [form, setForm] = useState({ name: '', nationalId: '', phone: '', email: '', address: '', notes: '' });
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  return (
    <Modal title={t.addClient} onClose={onClose} footer={<><Button variant="ghost" onClick={onClose}>{t.cancel}</Button><Button onClick={() => onSave(form)} disabled={!form.name}>{t.save}</Button></>}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t.fullName}><Input value={form.name} onChange={(v) => set('name', v)} placeholder={t.enterClientName} required /></Field>
        <Field label={t.cin}><Input value={form.nationalId} onChange={(v) => set('nationalId', v)} placeholder={t.enterCin} /></Field>
        <Field label={t.phone}><Input value={form.phone} onChange={(v) => set('phone', v)} placeholder={t.enterPhone} /></Field>
        <Field label={t.email}><Input value={form.email} onChange={(v) => set('email', v)} placeholder={t.enterEmail} type="email" /></Field>
        <div className="md:col-span-2"><Field label={t.address}><Input value={form.address} onChange={(v) => set('address', v)} placeholder={t.enterAddress} /></Field></div>
        <div className="md:col-span-2"><Field label={t.notesLabel}><TextArea value={form.notes} onChange={(v) => set('notes', v)} placeholder={t.optionalNotes} /></Field></div>
      </div>
    </Modal>
  );
}

function AddCaseModal({ onClose, onSave, clients, t }) {
  const [form, setForm] = useState({ clientId: clients[0]?.id || '', title: '', type: 'civil', status: 'active', court: '', opponent: '', lawyer: 'Karim Amine', description: '', nextHearing: '' });
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const save = () => onSave({ ...form, clientId: Number(form.clientId) });
  return (
    <Modal title={t.openCase} onClose={onClose} footer={<><Button variant="ghost" onClick={onClose}>{t.cancel}</Button><Button onClick={save} disabled={!form.title}>{t.save}</Button></>}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t.client}><Select value={form.clientId} onChange={(v) => set('clientId', v)}>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</Select></Field>
        <Field label={t.type}><Select value={form.type} onChange={(v) => set('type', v)}>{['civil', 'criminal', 'commercial', 'family', 'property'].map((type) => <option key={type} value={type}>{translateValue(t, type)}</option>)}</Select></Field>
        <div className="md:col-span-2"><Field label={t.caseTitle}><Input value={form.title} onChange={(v) => set('title', v)} placeholder={t.enterCaseTitle} /></Field></div>
        <Field label={t.court}><Input value={form.court} onChange={(v) => set('court', v)} placeholder={t.enterCourt} /></Field>
        <Field label={t.opponent}><Input value={form.opponent} onChange={(v) => set('opponent', v)} placeholder={t.enterOpponent} /></Field>
        <Field label={t.nextHearing}><Input value={form.nextHearing} onChange={(v) => set('nextHearing', v)} type="date" /></Field>
        <Field label={t.lawyer}><Input value={form.lawyer} onChange={(v) => set('lawyer', v)} /></Field>
        <div className="md:col-span-2"><Field label={t.description}><TextArea value={form.description} onChange={(v) => set('description', v)} placeholder={t.enterDescription} /></Field></div>
      </div>
    </Modal>
  );
}

function AddTaskModal({ onClose, onSave, cases, t }) {
  const [form, setForm] = useState({ caseId: cases[0]?.id || '', title: '', priority: 'normal', due: '' });
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  return (
    <Modal title={t.newTask} onClose={onClose} footer={<><Button variant="ghost" onClick={onClose}>{t.cancel}</Button><Button onClick={() => onSave({ ...form, caseId: Number(form.caseId) })} disabled={!form.title}>{t.save}</Button></>}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2"><Field label={t.taskTitle}><Input value={form.title} onChange={(v) => set('title', v)} placeholder={t.enterTaskTitle} /></Field></div>
        <Field label={t.case}><Select value={form.caseId} onChange={(v) => set('caseId', v)}>{cases.map((caseItem) => <option key={caseItem.id} value={caseItem.id}>{caseItem.title}</option>)}</Select></Field>
        <Field label={t.priority}><Select value={form.priority} onChange={(v) => set('priority', v)}>{['urgent', 'high', 'normal', 'low'].map((priority) => <option key={priority} value={priority}>{translateValue(t, priority)}</option>)}</Select></Field>
        <Field label={t.dueDate}><Input value={form.due} onChange={(v) => set('due', v)} type="date" /></Field>
      </div>
    </Modal>
  );
}

function AddHearingModal({ onClose, onSave, cases, t }) {
  const [form, setForm] = useState({ caseId: cases[0]?.id || '', title: '', court: '', date: '', time: '' });
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  return (
    <Modal title={t.scheduleHearing} onClose={onClose} footer={<><Button variant="ghost" onClick={onClose}>{t.cancel}</Button><Button onClick={() => onSave({ ...form, caseId: Number(form.caseId) })} disabled={!form.title || !form.date}>{t.save}</Button></>}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2"><Field label={t.case}><Select value={form.caseId} onChange={(v) => set('caseId', v)}>{cases.map((caseItem) => <option key={caseItem.id} value={caseItem.id}>{caseItem.title}</option>)}</Select></Field></div>
        <div className="md:col-span-2"><Field label={t.caseTitle}><Input value={form.title} onChange={(v) => set('title', v)} placeholder={t.enterCaseTitle} /></Field></div>
        <Field label={t.court}><Input value={form.court} onChange={(v) => set('court', v)} placeholder={t.enterCourt} /></Field>
        <Field label={t.date}><Input value={form.date} onChange={(v) => set('date', v)} type="date" /></Field>
        <Field label="Time"><Input value={form.time} onChange={(v) => set('time', v)} type="time" /></Field>
      </div>
    </Modal>
  );
}

function UploadDocModal({ onClose, onSave, cases, clients, t }) {
  const [form, setForm] = useState({ clientId: clients[0]?.id || '', caseId: cases[0]?.id || '', name: '', type: 'pdf', category: 'Evidence', date: new Date().toISOString().slice(0, 10), size: '1 MB' });
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  return (
    <Modal title={t.uploadDocument} onClose={onClose} footer={<><Button variant="ghost" onClick={onClose}>{t.cancel}</Button><Button onClick={() => onSave({ ...form, clientId: Number(form.clientId), caseId: Number(form.caseId) })} disabled={!form.name}>{t.save}</Button></>}>
      <div className="mb-5 rounded-2xl border-2 border-dashed border-law-border bg-law-paper p-8 text-center text-law-muted transition hover:border-law-gold hover:bg-law-goldPale dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-law-gold/10"><div className="text-4xl">{ICONS.upload}</div><p className="mt-2 font-semibold">{t.dragDrop}</p><p className="text-sm">{t.chooseFile}</p></div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2"><Field label={t.documentName}><Input value={form.name} onChange={(v) => set('name', v)} placeholder="document.pdf" /></Field></div>
        <Field label={t.client}><Select value={form.clientId} onChange={(v) => set('clientId', v)}>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</Select></Field>
        <Field label={t.case}><Select value={form.caseId} onChange={(v) => set('caseId', v)}>{cases.map((caseItem) => <option key={caseItem.id} value={caseItem.id}>{caseItem.title}</option>)}</Select></Field>
        <Field label={t.category}><Input value={form.category} onChange={(v) => set('category', v)} /></Field>
        <Field label={t.type}><Select value={form.type} onChange={(v) => set('type', v)}><option value="pdf">PDF</option><option value="docx">DOCX</option><option value="img">IMG</option></Select></Field>
      </div>
    </Modal>
  );
}

function AddExpenseModal({ onClose, onSave, clients, cases, t }) {
  const [form, setForm] = useState({ clientId: clients[0]?.id || '', caseId: cases[0]?.id || '', description: '', amount: '', date: new Date().toISOString().slice(0, 10), type: 'invoice', status: 'completed' });
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  return (
    <Modal title={t.recordTransaction} onClose={onClose} footer={<><Button variant="ghost" onClick={onClose}>{t.cancel}</Button><Button onClick={() => onSave({ ...form, clientId: Number(form.clientId), caseId: Number(form.caseId), amount: Number(form.amount || 0) })} disabled={!form.description || !form.amount}>{t.save}</Button></>}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2"><Field label={t.description}><Input value={form.description} onChange={(v) => set('description', v)} placeholder={t.enterDescription} /></Field></div>
        <Field label={t.client}><Select value={form.clientId} onChange={(v) => set('clientId', v)}>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</Select></Field>
        <Field label={t.case}><Select value={form.caseId} onChange={(v) => set('caseId', v)}>{cases.map((caseItem) => <option key={caseItem.id} value={caseItem.id}>{caseItem.title}</option>)}</Select></Field>
        <Field label={t.transactionType}><Select value={form.type} onChange={(v) => set('type', v)}>{['invoice', 'payment', 'expense'].map((type) => <option key={type} value={type}>{translateValue(t, type)}</option>)}</Select></Field>
        <Field label={t.amount}><Input value={form.amount} onChange={(v) => set('amount', v)} type="number" /></Field>
        <Field label={t.date}><Input value={form.date} onChange={(v) => set('date', v)} type="date" /></Field>
      </div>
    </Modal>
  );
}
