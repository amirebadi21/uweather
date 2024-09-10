import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles

  global.lang = { ff: "vr", ffb: "vb" }



  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      <Window title={"Shiraz Weather"} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        <br-x />
        <div style={{
          width: "100%", height: 50, backgroundColor: "#1F8A4FBD", borderRadius: 50,
          textAlign: "center",
        }}>
          <br-x />
          <br-xx />
          Weather FeelsLile(Celsius): {(props.weather[0].FeelsLikeC as number) + "°c"}
        </div>

        <br-x />

        <div style={{
          width: "100%", height: 50, backgroundColor: "#146B23BD", borderRadius: 50,
          textAlign: "center"
        }}>
          <br-x />
          <br-xx />
          Weather FeelsLike(Fahrenheit):
          {
            (Number(props.weather[0].FeelsLikeF) as number) + "°f"
          }
        </div>


        <br-x />

        <div style={{
          width: "100%", height: 50, backgroundColor: "#1F8A4FBD", borderRadius: 50,
          textAlign: "center"
        }}>
          <br-x />
          <br-xx />
          Humidity level:
          {
            (Number(props.weather[0].humidity) as number) + "%"
          }
        </div>


        <br-x />

        <div style={{
          width: "100%", height: 50, backgroundColor: "#146B23BD", borderRadius: 50,
          textAlign: "center"
        }}>
          <br-x />
          <br-xx />
          Sunrise:
          {
            ((props.w[0].astronomy[0].sunrise))
          }
        </div>

        <br-x />

        <div style={{
          width: "100%", height: 50, backgroundColor: "#1F8A4FBD", borderRadius: 50,
          textAlign: "center"
        }}>
          <br-x />
          <br-xx />
          Sunset:
          {
            ((props.w[0].astronomy[0].sunset) as number)
          }
        </div>
        <br-x />
        <br-xx />
        <center style={{ fontSize: 10, }}>
          تهیه شده توسط تیم پژوهشی اسپایدر
        </center>
        <br-x />
        <br-xx />


      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let res = await fetch("https://cdn.ituring.ir/research/api/weather/")
  let data = await res.json()
  let weather = data.current_condition
  let loca = data.nearest_area[0]
  let w = data.weather



  return {
    props: {
      data: global.QSON.stringify({
        weather: weather,
        loca: loca,
        w: w,
        session,
        // nlangs,
      })
    },
  }
}