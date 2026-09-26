 function DashboardCard({
  title,
  value,
  description,
  icon,
}) {
    return (
        <div className="rounded=2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500"> 
                        {title}
                    </p>

                    <h3 className="mt-1 text-3xl fomt-bold text-slate-900">
                        {value}
                    </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                    {icon}
                </div>
            </div>

            {description && (
                <p className="text-sm text-slate-500">
                    {description}
                </p>
            )}
        </div>
    )
}

export default DashboardCard;