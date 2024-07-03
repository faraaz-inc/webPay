export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="bg-gray-50 p-3 rounded-2xl">
      <div className="text-2xl">
        {title}
      </div>
      {children}
    </div>
  );
}
