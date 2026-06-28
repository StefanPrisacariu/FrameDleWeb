const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export function renderApiText(text: string) {
    return text.split(URL_REGEX).map((part, index) => {
        if (URL_REGEX.test(part)) {
            return (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--gold)" }}
                >
                    {part}
                </a>
            );
        }

        return part.split("\n").map((line, lineIndex, arr) => (
            <div key={`${index}-${lineIndex}`}>
                {line}
                {lineIndex < arr.length - 1 && <br />}
            </div>
        ));
    });
}
