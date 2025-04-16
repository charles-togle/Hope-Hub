export default function LectureIntroduction({title, introduction, status}){
    console.log(title)
    return(
        <div id="lecture-introduction">
            <p>{title}</p>
            <p>{introduction}</p>
            <p>{status}</p>
        </div>
    )
}