import Channel from '../model/Channel.model'

async function create({ body: { title } }, res) {
  try {
    let channel = new Channel({ title })
    channel = await channel.save()
    // eslint-disable-next-line
    res.json({ message: `Channel ${title} was succesfully created`, channel })
  } catch (e) {
    console.log(e)
    res.status(500)
  }
}

async function all(req, res) {
  try {
    let channels = await Channel.find({})
    channels = channels.reduce((acc, rec) => {
      return {
        ...acc,
        [rec.title]: {
          cid: rec._id,
          users: rec.users,
          messages: rec.messages
        }
      }
    }, {})
    res.json({ message: `Channels list loaded succesfully`, channels })
  } catch (e) {
    console.log(e)
    res.status(500)
  }
}

export default { create, all }
