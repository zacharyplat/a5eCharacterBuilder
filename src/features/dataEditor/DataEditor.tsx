import { Button, Card, Input, Typography } from "@material-tailwind/react"
import { useAppDispatch } from "../../app/hooks"
import { Attributes } from "./dataEditor"

export const DataEditor = () => {
  const dispatch = useAppDispatch()
  console.log(dispatch)

  const heritageForm: Attributes = {
    age: {name: "Age", description: "The age of the character", value: ""},
    speed: {name: "Speed", description: "The speed of the character", value: ""},
    size: {name: "Size", description: "The size of the character", value: ""},
    traits: [{name: "Trait", description: "The traits of the character", value: ""}],
    proficiencies: [{name: "Proficiency", description: "The proficiencies of the character", value: ""}],
    equipment: [{name: "Equipment", description: "The equipment of the character", value: ""}],
    spells: [{name: "Spell", description: "The spells of the character", value: ""}],
    hp: 0,
    ac: 0,
    skills: [{name: "Skill", description: "The skills of the character", value: ""}]
  }
  console.log(heritageForm);

  return (
<Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                          className: "before:content-none after:content-none",
                      }} crossOrigin={undefined}          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                          className: "before:content-none after:content-none",
                      }} crossOrigin={undefined}          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
                      type="password"
                      size="lg"
                      placeholder="********"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                          className: "before:content-none after:content-none",
                      }} crossOrigin={undefined}          />
        </div>
        <Button className="mt-6" fullWidth>
          sign up
        </Button>
      </form>
    </Card>
  )
}
