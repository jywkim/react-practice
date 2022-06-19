const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

export default function Distance({ leg }) {
    if (!leg.distance || !leg.duration) return null;

    const days = Math.floor(
        commutesPerYear * leg.duration.value / secondsPerDay
    );

    const cost = Math.floor(
        (leg.distance.value / 1000) * litreCostKM * commutesPerYear
    );

    return (
        <div>
            <p>
                This home is <span className="highlightCommute">{leg.distance.text}</span> away
                from your office. That would take{" "}
                <span className="highlightCommute">{leg.duration.text}</span> each direction.
            </p>

            <p>
                That's <span className="highlightCommute">{days} days</span> in your car each 
                year at a cost of{" "} 
                <span className="highlightCommute">
                    ${new Intl.NumberFormat().format(cost)}
                </span>
                .
            </p>
        </div>
    );
}