export default function LectureIntroduction({index, title, introduction, status}){
    console.log(title)
    return(
        <div id="lecture-introduction" className="border-3 border-black rounded-md">
            <p>{index}</p>
            <p>{title}</p>
            <p>{introduction}</p>
            <p>{status}</p>
        </div>
    )
}