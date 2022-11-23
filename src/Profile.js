import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, userState }) => {
  const [fileInput, setFileInput] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  if (!user) navigate('/');

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log('hi');
    try {
      fetch(`${process.env.REACT_APP_API_URL}/profile/upload/${user._id}`, {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          userState();
          setPreviewSource(null);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) navigate('/');
  }, []);

  return (
    <div className="profile-container">
      <h2 className="info title-h2">
        {user?.name} {user?.lastname}
      </h2>
      <div className="profile-img-container">
        <form onSubmit={handleSubmit} className="profile-form">
          <label htmlFor="image" id="img-upload-label">
            {previewSource ? (
              <div className="user-img">
                <img src={previewSource} />
              </div>
            ) : (
              <div className="user-img">
                <img src={user?.img.url} alt="" />
              </div>
            )}
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInput}
            id="image"
          />
          {previewSource && !loading && <button type="submit">Submit</button>}
          {previewSource && !loading && (
            <button onClick={() => setPreviewSource(null)}>Cancel</button>
          )}
          {loading && <div>Loading...</div>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
