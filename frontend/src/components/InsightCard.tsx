interface InsightCardProps {
    type:"positive" | "warning" | "recommendation";
    title: string;
    description: string;
}

function InsightCard({
    type,
    title,
    description,
}: InsightCardProps){
    return (
        <div className={`insight-card ${type}`}>
            <div>
                {type === "positive" && <span>✅</span>}
                {type === "warning" && <span>❌</span>}
                {type === "recommendation" && <span>💡</span>}
            </div>

            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default InsightCard;