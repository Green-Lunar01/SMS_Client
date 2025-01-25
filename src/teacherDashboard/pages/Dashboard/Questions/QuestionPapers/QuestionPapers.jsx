import React from "react";
import "./QuestionPapers.css";
import { TfiDownload } from "react-icons/tfi";
import { RiEdit2Line } from "react-icons/ri";

const QuestionPapers = () => {
	return (
		<div className="question-papers">
			<section className="top">
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="subject">Select Subject*</label>
						<select name="subject" id="subject">
							<option value="Maths">Maths</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="class">Class*</label>
						<select name="class" id="class">
							<option value="J.S.S 1">J.S.S 1</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="term">Term</label>
						<select name="term" id="term">
							<option value="Term 1">Term 1</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="session">Session</label>
						<select name="session" id="session">
							<option value="2022/2023">2022/2023</option>
						</select>
					</div>

					<button className="primary-btn">Search</button>
				</div>
				<button className="download-btn">
					<TfiDownload />
					<span>Download</span>
				</button>
			</section>

			<section className="bottom">
				<span>
					<RiEdit2Line />
				</span>
				<main>
					<header>
						<h2>Biology J.S.S 1 2nd Term 2024/2025</h2>
						<p>Duration: 2:30 hrs</p>
					</header>
					<section>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Id earum numquam sapiente a vel eum quis aperiam
						eligendi aliquam, excepturi labore iusto possimus, quae
						rem at cum quos. Deleniti, ipsum? Perferendis omnis
						fugiat dolore aliquid porro nihil iure nam cumque
						obcaecati voluptates ea sapiente expedita ratione ab
						eaque, tempore magni reiciendis culpa? Quaerat illo cum
						quo repellendus asperiores sit molestiae. Voluptas
						beatae minima eum possimus inventore maxime ad quae sit
						odit illo provident quasi, alias corrupti. Voluptates,
						hic quidem dolorum quo sed ipsam tenetur voluptate,
						itaque consectetur, perspiciatis provident eum!
						<br />
						<br />
						Accusantium non excepturi ex quaerat veniam, expedita
						saepe illo odio reprehenderit at vitae error ratione
						porro doloribus libero facilis dignissimos perspiciatis,
						ducimus impedit dolor, sit praesentium atque. Repellat,
						ipsum illo! Saepe ea magnam, consequatur unde aperiam
						quo fuga libero rem deleniti laborum, inventore culpa
						autem? Laudantium maxime nobis saepe laboriosam
						provident unde cupiditate a, aut quaerat ullam,
						necessitatibus nam perspiciatis? Voluptatum adipisci,
						laboriosam similique, nemo dolor laudantium neque ut
						corporis quo animi eligendi numquam! Facilis quod nihil
						quasi, fuga sunt quibusdam cum autem ab modi praesentium
						eius, perferendis illum non! Sit unde ab optio iure non
						autem doloremque, recusandae accusamus quos
						<br />
						<br />
						exercitationem similique dolorum consectetur tempore qui
						adipisci voluptates voluptas dolores ex veritatis
						debitis aut laudantium delectus ipsam hic? Praesentium.
						Repudiandae provident rerum est velit aut perspiciatis
						odit consectetur, dolores hic quia tempore modi a ea,
						dolore ipsam dolorem atque molestias deleniti eligendi
						similique porro maiores corporis consequuntur eius?
						Soluta. Voluptatem hic nulla dicta a tempora esse ipsam
						quasi quo earum. Aliquam, corporis repudiandae dolore
						facere earum obcaecati quaerat, asperiores non quisquam
						maxime harum nobis! Ab officiis in eveniet fugiat?
						Tenetur quia delectus facere officiis laudantium! Eum
						explicabo natus ea aliquam. Officia, odit? Dolor unde
						non nemo quia error officia, perferendis accusantium
						deleniti voluptatum nobis libero enim, eligendi tempora
						autem!
					</section>
				</main>
			</section>
		</div>
	);
};

export default QuestionPapers;
