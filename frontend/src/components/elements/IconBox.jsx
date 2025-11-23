// CHUYỂN VÀO FILE: src/components/elements/IconBox.jsx
const IconBox = ({ icon, label, className }) => (
    <div className={`p-4 rounded-xl border-2 ${className}`}>
        {icon}
        <p className="mt-2 text-sm text-gray-300">{label}</p>
    </div>
);
// KẾT THÚC CHUYỂN VÀO FILE: src/components/elements/IconBox.jsx
