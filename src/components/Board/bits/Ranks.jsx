import './Ranks.css'

const Ranks = ({ranks}) => {
    return <div className="ranks">{ranks.map((rank, i) => <span key={rank}>{rank}</span>)}</div>
}

export default Ranks;