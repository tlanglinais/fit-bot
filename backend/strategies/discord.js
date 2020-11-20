const passport = require("passport");
const DiscordStrategy = require("passport-discord");
const User = require("../db/schemas/User");

passport.serializeUser((user, done) => {
  done(null, user.discordId);
});

passport.deserializeUser(async (discordId, done) => {
  try {
    const user = await User.findById(discordId);
    return user ? done(null, user) : done(null, null);
  } catch (error) {
    console.log(error);
    done(null, null);
  }
});
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ["indentify", "guild"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, username, discriminator, avatar, guilds } = profile;

      try {
        const user = await User.findOneAndUpdate(
          { discordId: id },
          {
            discordTag: `${username}#${discriminator}`,
            avatar,
            guilds,
          },
          { new: true }
        );

        if (user) {
          console.log(`User was found.`);
          return done();
        } else {
          const newUser = User.create({
            discordId: id,
            discordTag: `${username}#${discriminator}`,
            avatar,
            guilds,
          });
          return done(null, newUser);
        }
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    }
  )
);
