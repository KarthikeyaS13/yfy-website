'use client';

export default function NewsletterForm() {
  return (
    <form
      className="footer-form"
      onSubmit={(e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        if (email) {
          // TODO: wire up to your email marketing service
          alert('Thanks! You\'ll receive compliance alerts at ' + email);
          e.target.reset();
        }
      }}
    >
      <input
        type="email"
        name="email"
        className="footer-input"
        placeholder="your@company.com"
        aria-label="Email for compliance alerts"
        required
      />
      <button type="submit" className="btn btn-primary btn-sm">
        Subscribe
      </button>
    </form>
  );
}
