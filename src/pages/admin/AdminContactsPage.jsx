import { useState } from 'react';
import { MessageSquare, Mail, Phone, Calendar, Eye } from 'lucide-react';

const contacts = [
  { id: 1, name: 'Vikram Patel', email: 'vikram@email.com', phone: '9876543210', subject: 'Donation Inquiry', message: 'I want to donate for the hospital initiative.', date: '2026-05-28', read: false },
  { id: 2, name: 'Anita Rao', email: 'anita@email.com', phone: '9876543211', subject: 'Volunteer Interest', message: 'How can I become a volunteer?', date: '2026-05-27', read: true },
  { id: 3, name: 'Suresh Kumar', email: 'suresh@email.com', phone: '9876543212', subject: 'Partnership', message: 'We want to partner with your foundation for CSR activities.', date: '2026-05-26', read: false },
];

export default function AdminContactsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0d2c54]">Contact Messages</h1>
        <p className="text-gray-500">View and manage contact form submissions</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          {contacts.map(c => (
            <div key={c.id} onClick={() => setSelected(c)} className={`bg-white rounded-xl p-5 border cursor-pointer hover:shadow-lg transition ${!c.read ? 'border-l-4 border-l-orange-500' : ''} ${selected?.id === c.id ? 'ring-2 ring-orange-500' : ''}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#0d2c54]">{c.name}</h3>
                <span className="text-xs text-gray-500">{c.date}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium mt-1">{c.subject}</p>
              <p className="text-sm text-gray-500 mt-1 truncate">{c.message}</p>
            </div>
          ))}
        </div>

        {selected ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border h-fit">
            <h2 className="text-xl font-bold text-[#0d2c54] mb-4">{selected.subject}</h2>
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <p className="flex items-center gap-2"><MessageSquare size={14} /> {selected.name}</p>
              <p className="flex items-center gap-2"><Mail size={14} /> {selected.email}</p>
              <p className="flex items-center gap-2"><Phone size={14} /> {selected.phone}</p>
              <p className="flex items-center gap-2"><Calendar size={14} /> {selected.date}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700">{selected.message}</p>
            </div>
            <button className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition">
              Reply via Email
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed">
            <Eye size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400">Select a message to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
