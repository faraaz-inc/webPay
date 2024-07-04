"use client"

export function Select({onSelect, options}: {options: {key: string, value: string}[], onSelect: (value: string) => void}) {

    return <select onChange={(e) => {onSelect(e.target.value)}} className="bg-gray-100 border border-gray-300 rounded-lg focus:ring-primary w-full p-2 text-gray-900 block">
        {options.map(option => <option key={option.key} value={option.key}>{option.value}</option>)}
    </select>
}