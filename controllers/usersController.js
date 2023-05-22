import User from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export const findAllUsers = async (req, res) => {
    try {
      const allUsers = await User.find({});
      if (allUsers.length > 0) {
        return res.status(200).json(allUsers);
      }
      return res.status(404).json({ message: "No users found." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to find users." });
    }
  };

export const findUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.find({_id: id});
    if (user) {
      return res.status(200).json(user);
    }
    else res.status(404).jsonn(`user: ${id} do not exost`)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to find user." });
  }
};
export const userRegistration = async (req, res) => {

  try {
    const { firstName, lastName, email, password } = req.body;
    const role = "user"

 

    if (!password || password.length < 8) {
      return res.status(400).json("please provide 8+ characters password");
    } if (!firstName || firstName.length < 3) {
      return res.status(400).json("please provide 3+ characters first name");
    } if (!lastName || lastName.length < 3) {
      return res.status(400).json("please provide 8+ characters last name");
    }

      if (!email) {
          return res.status(400).json({ message: "Please provide an email address." });
        }


    const at = [];
    for (let i = 0; i < email.length; i++) {
      if (email[i] === "@") {
        at.push(email[i]);
      }
    }

    if (at.length !== 1) {
      return res.status(400).json({ message: "Wrong email format." });
    }

    const findUser = await User.findOne({ email: email });
    console.log(findUser)
    if (findUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role
     
    };
    console.log(user)


    const createdUser = await User.create(user);

    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      user: createdUser,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create user." });
  }
};

export const userLogIn = async (req, res) =>{
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password
  console.log(password)

try {
  if(!email){
    return res.status(404).json('please enter email')
  }
  if(!password){
    return res.status(404).json('please enter password')
  }
const user =  await User.findOne({email: email})
console.log(user)
if(user.length === 0){
  return res.status(404).json('user not found')

}

const passwordCompare = await bcrypt.compare(password, user.password)
console.log(passwordCompare)

if(passwordCompare === false){
 return res.status(400).json("wrong password")
}

    const token = jwt.sign(
      {
        userId: user._id, 
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      token,
    });

  
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Failed to log in." });
}
}





export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("user is not found");
    }
    // const { firstName, lastName, password, role } = req.body || user


    const firstName = req.body.firstName || user.firstName
    const lastName = req.body.lastName || user.lastName
    const password = req.body.password || user.password
    const role = req.body.role || user.role
    console.log(firstName)
    console.log(lastName)
    console.log(password)
    console.log(role)


    if (password.length < 8) {
      return res.status(400).json(" password should be 8 or more characters");
    } else if (firstName.length < 3) {
      return res.status(400).json("first name should be 3 or more characters");
    } else if (lastName.length < 3) {
      return res.status(400).json("last name should be 3 or more characters");
    }
const hashedPassword = await bcrypt.hash(password, 12)

const updatedUser = await User.findByIdAndUpdate(id, {
  firstName: firstName,
 lastName: lastName,
  password: hashedPassword,
  role: role
 }, { new: true } )


     return await res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update user." });
  }
};


export const deleteUser = async(req, res) =>{
  try {
      const id = req.params.id
      await User.findByIdAndDelete(id)
      return res.status(204).json('user deleted')
      
  } catch (error) {
      return res.status(500).json({ message: "Failed to delete user." });
    }
}
