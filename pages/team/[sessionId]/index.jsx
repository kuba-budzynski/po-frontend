// here will be team dashboard

import Topbar, {TopbarButton} from "components/Topbar";
import Link from "next/link"
import {FaLaptopCode, FaQuestionCircle} from "react-icons/fa";
import {useRouter} from "next/router";

const TeamDashboard = () => {
  const router = useRouter()
  const {sessionId} = router.query
  return (
    <div>
      <Topbar>
        <TopbarButton
          href={{
            pathname: "/team/[sessionId]",
            query: {sessionId}
          }}
        >
          <FaLaptopCode className="mr-3"/> Zawody
        </TopbarButton>
        <TopbarButton disabled>
          <FaQuestionCircle className="mr-3"/> Pytania i odpowiedzi
        </TopbarButton>
      </Topbar>
      <main>
        <Link href={{
          pathname: "/team/[sessionId]/exercise/5ffe158d66799d1dd4767ef2",
          query: {sessionId}
        }}>
          Przekieruj do zadania
        </Link>
      </main>
    </div>
  )
};

export default TeamDashboard
