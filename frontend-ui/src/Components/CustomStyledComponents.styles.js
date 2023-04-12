import styled from "@emotion/styled";
import { Grid} from "@mui/material";

//custom style
export const StyledCenteredGrid = styled(Grid)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;

  @media (max-width: 768px) {
    width: 80vw;
  }
`;