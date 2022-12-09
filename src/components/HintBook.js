import "./HintBook.css";

const HintBook = () => {
    return (
        <div className="hints">
            <div className="hints-inner">
                <div className="left">
                    <h3>Thin</h3>
                    <p>Pros: Stays cool <br /> Cons: Freezes easier</p>

                    <h3>Bulky</h3>
                    <p>Pros: Stays warm <br /> Cons: Overheats</p>

                    <h3>Hairy</h3>
                    <p>Pros: Resistant to cold <br /> Cons: May overheat</p>

                    <h3>Hairless</h3>
                    <p>Pros: Cooler in heat <br /> Cons: Weakness to cold</p>
                </div>

                <div className="right">
                    <h3>Short Legs</h3>
                    <p>Pros: Less likely to freeze <br /> Cons: Not very fast</p>

                    <h3>Long Legs</h3>
                    <p>Pros: Agile <br /> Cons: Weakness to cold</p>

                    <h3>Long Horns</h3>
                    <p>Pros: Self defense <br /> Cons: Can be scary</p>

                    <h3>Stripes</h3>
                    <p>Pros: Hides from predators <br /> Cons: Can't wear plaid</p>
                </div>
            </div>
        </div>
    )
}

export default HintBook;
