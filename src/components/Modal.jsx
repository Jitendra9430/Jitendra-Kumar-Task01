function Modal ({
    isOpen,
    title,
    children,
    onClose,
    onConfirm,
    confirmText = "Confirm",
}) {
    if(!isOpen) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        classname="text-xl text-slate-400 hover:text-slate-700"
                        >
                            X 
                    </button>
                </div>

                <div className="mb-6 text-sm leading-6 text-slate-600">
                    {children}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                    onClick={onclose}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Cancel 
                    </button>

                    <button
                    onClick={onConfirm} 
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>


    );
};

export default Modal;