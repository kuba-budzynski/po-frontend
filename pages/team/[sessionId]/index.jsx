// here will be team dashboard

import Topbar, {TopbarButton} from "components/Topbar";
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
          <FaLaptopCode className="mr-3" /> Zawody
        </TopbarButton>
        <TopbarButton disabled>
          <FaQuestionCircle className="mr-3" /> Pytania i odpowiedzi
        </TopbarButton>
      </Topbar>
      TeamDashboard
    </div>
  )
};

export default TeamDashboard
