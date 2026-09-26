function ProgressBar ({progress = 0}) {
    return (
        <div className="w-full">
            <div className="mb-1 flex justify-between text-xs text-slate-500">
                <span>Progress</span>
                <span>{progress}%</span>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                    style={{width: `${progress}%`}}>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar;