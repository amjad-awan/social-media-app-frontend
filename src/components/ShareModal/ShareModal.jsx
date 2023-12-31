import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from './../PostShare/PostShare';

function ShareModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
					<PostShare/>
      {/* Modal content */}
      {/* <form action="" className="infoForm">
        <h3>Your info</h3>
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="FirstName"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="LastName"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Lives in"
            className="infoInput"
            name="LivesIn"
          />
          <input
            type="text"
            placeholder="Country"
            className="infoInput"
            name="Country"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="RelationShip Status"
            className="infoInput"
            name="RelationShipStatus"
          />
        </div>
        <div>
          Profile Image
          <input type="file"  name="ProfileImage" />
          Cover Image
          <input type="file"  name="CoverImage" />
        </div>
        
        <button className="button infoButton">Update</button>
      </form> */}
    </Modal>
  );
}
export default ShareModal;
