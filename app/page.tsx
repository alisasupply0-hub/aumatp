// Status Bar Component
  const StatusBar = () => (
    <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[#FCA5A5] text-[12px] font-semibold select-none">
      <span>9:41</span>
      <div className="w-24 h-5 bg-black rounded-full mx-auto" />
      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-[1.5px] h-2.5">
          <span className="w-[2px] h-1 bg-[#F87171] rounded-sm" />
          <span className="w-[2px] h-1.5 bg-[#F87171] rounded-sm" />
          <span className="w-[2px] h-2 bg-[#F87171] rounded-sm" />
          <span className="w-[2px] h-2.5 bg-[#F87171] rounded-sm" />
        </div>
        <svg className="w-3.5 h-3.5 text-[#F87171]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.3l1.4 1.4C9.4 16.4 10.6 16 12 16s2.6.4 3.5 1.1l1.4-1.4C15.6 14.6 13.9 14 12 14s-3.6.6-4.9 1.7zm-2.8-2.8l1.4 1.4C7.3 13 9.5 12 12 12s4.7 1 6.3 2.3l1.4-1.4C17.7 11.1 15 10 12 10s-5.7 1.1-7.7 2.9z" />
        </svg>
        <div className="w-5 h-2.5 border border-[#F87171]/80 rounded-[3px] p-[1px] flex items-center">
          <div className="w-full h-full bg-[#F87171] rounded-[1px]" />
        </div>
      </div>
    </div>
  );