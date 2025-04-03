import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const UserInfo: React.FC = () => {
  const userData: Record<string, string> = {
    id: "실제 id",
    email: "...@gmail.com",
    password: "실제 pw",
    nickname: "333",
    age: "30",
    region: "제주",
    gender: "여성",
    intro: "한 줄 소개",
    created_at: "25-04-01",
    recent_at: "25-04-01",
    platform: "ios",
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "30%", margin: "auto", mt: 3, p: 2 }}
    >
      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
      >
        사용자 정보
      </Typography>
      <Table>
        <TableBody>
          {Object.entries(userData).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                {key}
              </TableCell>
              <TableCell sx={{ width: "70%" }}>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserInfo;
