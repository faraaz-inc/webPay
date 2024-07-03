"use client";

interface ButtonProps {
  onClick: () => void;
  title: string;
}

export const Button = ({onClick, title }: ButtonProps) => {
  return (
    <button onClick={onClick} className="bg-primary text-gray-200 rounded-full px-5 py-3">
      {title}
    </button>
  );
};
