import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { memberInfo } from "../../Recoils/atoms/MemberDeatilAtom";
import { useRecoilValue } from "recoil";

type iMemberInfo = {
  id: string;
  email: string;
  password: string;
  nickname: string;
  age: string;
  region: string;
  gender: string;
  intro: string;
  created_at: string;
  recent_at: string;
  platform: string;
};

const UserInfo: React.FC = () => {
  const navigate = useNavigate();
  const memberInformation = useRecoilValue(memberInfo);
  const [rows, setRows] = useState<iMemberInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!memberInformation.id) {
      console.log("memberInformation.id 없음, 데이터 요청 취소");
      setIsLoading(false);
      return;
    }

    console.log("memberInformation Id : " + memberInformation.id);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://54.180.234.254:3000/manager/member/id/${encodeURIComponent(
            memberInformation.id
          )}`
        );
        const data = await response.json();
        const result = data.data;
        console.log("받은 데이터 MemberInfo:", result);

        if (result && typeof result === "object") {
          const formattedRows: iMemberInfo = {
            id: result.id ?? "",
            email: result.email ?? "",
            password: result.password ?? "",
            nickname: result.nickname ?? "",
            age: result.age ?? "",
            region: result.region ?? "",
            gender: result.gender ?? "",
            intro: result.intro ?? "",
            created_at: result.created_at
              ? result.created_at.split("T")[0]
              : "",
            recent_at: result.recent_at ? result.recent_at.split("T")[0] : "",
            platform: result.platform ?? "",
          };

          console.log("Formatted Rows:", formattedRows);
          setRows([formattedRows]); // 배열로 저장
        } else {
          setRows([]);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [memberInformation]);

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "50%", margin: "auto", mt: 3, p: 2 }}
    >
      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
      >
        사용자 정보
      </Typography>

      {isLoading ? (
        <CircularProgress sx={{ display: "block", margin: "auto", my: 2 }} />
      ) : rows.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "gray" }}>
          사용자 정보가 없습니다.
        </Typography>
      ) : (
        <Table>
          <TableBody>
            {rows.map((row, index) =>
              Object.entries(row).map(([key, value]) => (
                <TableRow key={`${index}-${key}`}>
                  <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                    {key}
                  </TableCell>
                  <TableCell sx={{ width: "70%" }}>{String(value)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default UserInfo;
