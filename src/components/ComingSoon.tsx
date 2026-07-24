interface Props {
  title: string;
}

export default function ComingSoon({ title }: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">
          {title}
        </h2>

        <p className="text-slate-500">
          Este módulo estará disponible próximamente.
        </p>
      </div>
    </div>
  );
}
