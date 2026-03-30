export function ConversionBanner() {
  return (
    <section className="py-20 px-6 mt-16 bg-slate-50 border-t border-slate-200 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Need a tailored AI solution for your business?
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          From integrating local workflows to building autonomous enterprise agents, I help companies turn AI potential into revenue. Let's discuss your project.
        </p>
        <a
          href="https://ivannikov.pro/services/consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-4 rounded-xl transition-colors shadow-sm"
        >
          Book a Discovery Call
        </a>
      </div>
    </section>
  );
}
