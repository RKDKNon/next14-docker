export async function GET(){
    return Response.json({
      geographies: [
        {
          "id": 1,
          "name": "ภาคเหนือ"
        },
        {
          "id": 2,
          "name": "ภาคกลาง"
        },
        {
          "id": 3,
          "name": "ภาคตะวันออกเฉียงเหนือ"
        },
        {
          "id": 4,
          "name": "ภาคตะวันตก"
        },
        {
          "id": 5,
          "name": "ภาคตะวันออก"
        },
        {
          "id": 6,
          "name": "ภาคใต้"
        }
      ]
    })
}