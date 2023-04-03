export default function InfoCard({ icon, title, subtitle }) {
  return (
    <div className="bg-light rounded-xl border border-neutral-800 p-5 py-4 flex flex-col items-center justify-center gap-4 flex-wrap">
      <div className="">
        <p>{icon}</p>
      </div>

      <div className="text-center">
        <p className="text-2xl font-bold text-dark">{title}</p>
        <p className="text-xs mx-auto text-neutral-500 w-5/6">{subtitle}</p>
      </div>
    </div>
  );
}
