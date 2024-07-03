"use client"

export function TextInput({label, placeholder, onChange}: {label: string, placeholder: string, onChange: (value: string)=> void}) {

    return <div>
        <label className="block mt-5 mb-2 text-md text-gray-900">{label}</label>
        <input type="text" placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="bg-gray-100 w-full border border-gray-50 rounded-lg p-2 focus:ring-primary focus:border-primary block" />
    </div>
}