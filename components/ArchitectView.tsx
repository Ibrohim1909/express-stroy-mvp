
import React from 'react';
import { DB_SCHEMA } from '../constants';

const ArchitectView: React.FC = () => {
  return (
    <div className="p-4 max-w-5xl mx-auto space-y-8 pb-24">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Functional Specification</h1>
        <p className="text-gray-500 mt-2">Design documentation for StroyExpress Marketplace (Uzbekistan)</p>
      </header>

      <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
          User Flow & Logic
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium text-blue-600">Onboarding</h3>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Phone OTP Verification (Firebase Auth / Twilio)</li>
              <li>Role Assignment (Buyer/Seller/Driver)</li>
              <li>Referral Code injection during signup</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-blue-600">Dynamic Pricing</h3>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>If Qty {'>='} Wholesale_Min: Apply wholesale_price</li>
              <li>Else: Apply retail_price</li>
              <li>Live calculation in Shopping Cart</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm">2</span>
          Database Schema (ERD Model)
        </h2>
        
        <div className="space-y-6">
          {DB_SCHEMA.map((table) => (
            <div key={table.name} className="overflow-hidden border border-gray-200 rounded-lg">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                <span className="font-bold text-gray-700">Table: {table.name}</span>
                <span className="text-xs text-gray-500 italic">{table.description}</span>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Key</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {table.columns.map((col) => (
                    <tr key={col.name}>
                      <td className="px-4 py-2 font-mono text-blue-600">{col.name}</td>
                      <td className="px-4 py-2 text-gray-600">{col.type}</td>
                      <td className="px-4 py-2">
                        {col.key && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${col.key === 'PK' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {col.key}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-gray-500">{col.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">No-Code Implementation Strategy</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center font-bold">1</div>
            <div>
              <p className="font-bold">FlutterFlow Integration</p>
              <p className="text-sm text-yellow-700">Connect to Supabase for the relational schema defined above. Use App State for the cart and language toggle.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center font-bold">2</div>
            <div>
              <p className="font-bold">Multi-Language Logic</p>
              <p className="text-sm text-yellow-700">Store translations in a JSON variable or dynamic Firestore collection. Use Conditional Visibility to show specific labels based on 'currentUser.language'.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArchitectView;
