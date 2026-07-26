export function HeroPulseRail() {
  return (
    <div
      aria-hidden="true"
      className="hero-pulse-rail"
      data-testid="hero-pulse-rail"
    >
      <span
        className="hero-pulse-signal"
        data-testid="hero-pulse-signal"
      >
        <span
          className="hero-pulse-spark"
          data-testid="hero-pulse-spark"
        />
      </span>
    </div>
  );
}
