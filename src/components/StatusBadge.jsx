function StatusBadge ({status}) {
    const submitted = status === "submitted";

    return (
        <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
            submitted ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700"
        }`}
        >
            {submitted ? "Submitted": "Not Submitted"}
        </span>
    )
};

export default StatusBadge;