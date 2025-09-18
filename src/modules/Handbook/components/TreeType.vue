<script setup>
import { ref } from 'vue'
import CardItem from './CardItem.vue'
import CollapseList from './CollapseList.vue'
import TreeList from './TreeList.vue'
import CollapseCount from './CollapseCount.vue'

const props = defineProps({
  value: {
    type: Object,
    default: () => {}
  },
  isSearch: {
    type: Boolean
  },
  totalCount: {
    type: Number
  }
})
const toggle = ref(0)
const value2 = ref([{
  "id": 9,
  "name": "Axborot texnologiyalari departamenti",
  "condition": "A",
  "users": [
    {
      "id": 106,
      "full_name": "Valiev Аzizbek",
      "cisco": null,
      "color": "#673AB7",
      "email": "Valiev@example.com",
      "status": {
        "id": 1,
        "name": "V rabote",
        "code": "A"
      },
      "position": {
        "id": 7,
        "name": "Departament direktori oʻrinbosari",
        "code": "5"
      },
      "top_level_department": {
        "id": 9,
        "name": "Axborot texnologiyalari departamenti"
      },
      "department": {
        "id": 9,
        "name": "Axborot texnologiyalari departamenti"
      },
      "company": {
        "id": 16,
        "name": "Bosh ofis"
      },
      "avatar": null,
      "mobile_number": null,
      "room_number": null,
      "floor": null,
      "work_address": null,
      "phone_2": null,
      "private_chat_id": "41668e03-7069-49a8-9203-a086179edb8d",
      "is_selected": false,
      "favourite_id": null,
      "leave_end_date": null
    }
  ],
  "children": [
    {
      "id": 11,
      "name": "Dep name 1",
      "condition": "P",
      "users": [
        {
          "id": 220,
          "full_name": "111",
          "cisco": null,
          "color": "#FF9800",
          "email": null,
          "status": {
            "id": 1,
            "name": "V rabote",
            "code": "A"
          },
          "position": {
            "id": 11,
            "name": "Bosh mutaxassis",
            "code": "9"
          },
          "top_level_department": {
            "id": 11,
            "name": "Dep name 1"
          },
          "department": {
            "id": 11,
            "name": "Dep name 1"
          },
          "company": {
            "id": 16,
            "name": "Bosh ofis"
          },
          "avatar": null,
          "mobile_number": null,
          "room_number": null,
          "floor": null,
          "work_address": null,
          "phone_2": null,
          "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
          "is_selected": true,
          "favourite_id": 37,
          "leave_end_date": null
        },
      ],
      "children": [
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "111 - 111",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": [
            {
              "id": 33,
              "name": "BBBB Malumotlar markazi bolasi",
              "condition": "A",
              "users": [
                {
                  "id": 17,
                  "full_name": "111 - 111 - 111",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 2,
                    "name": "В отпуске",
                    "code": "OT"
                  },
                  "position": {
                    "id": 7,
                    "name": "Departament direktori oʻrinbosari",
                    "code": "5"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                  "is_selected": true,
                  "favourite_id": 39,
                  "leave_end_date": null
                },
              ],
              "children": []
            }
          ]
        },
        {
          "id": 33,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "222 - 111",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": [
            {
              "id": 33,
              "name": "BBBB Malumotlar markazi bolasi",
              "condition": "A",
              "users": [
                {
                  "id": 17,
                  "full_name": "111 - 222 - 111",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 2,
                    "name": "В отпуске",
                    "code": "OT"
                  },
                  "position": {
                    "id": 7,
                    "name": "Departament direktori oʻrinbosari",
                    "code": "5"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                  "is_selected": true,
                  "favourite_id": 39,
                  "leave_end_date": null
                },
              ],
              "children": []
            }
          ]
        },
        {
          "id": 33,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "333 - 111",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": [
            {
              "id": 33,
              "name": "BBBB Malumotlar markazi bolasi",
              "condition": "A",
              "users": [
                {
                  "id": 17,
                  "full_name": "111 - 333 - 111",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 2,
                    "name": "В отпуске",
                    "code": "OT"
                  },
                  "position": {
                    "id": 7,
                    "name": "Departament direktori oʻrinbosari",
                    "code": "5"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                  "is_selected": true,
                  "favourite_id": 39,
                  "leave_end_date": null
                },
              ],
              "children": []
            }
          ]
        },
        {
          "id": 33,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "444 - 111",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": [
            {
              "id": 33,
              "name": "BBBB Malumotlar markazi bolasi",
              "condition": "A",
              "users": [
                {
                  "id": 17,
                  "full_name": "111 - 444 - 111",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 2,
                    "name": "В отпуске",
                    "code": "OT"
                  },
                  "position": {
                    "id": 7,
                    "name": "Departament direktori oʻrinbosari",
                    "code": "5"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                  "is_selected": true,
                  "favourite_id": 39,
                  "leave_end_date": null
                },
              ],
              "children": []
            }
          ]
        },
        {
          "id": 33,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "555 - 111",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": [
            {
              "id": 11,
              "name": "Dep name 1",
              "condition": "P",
              "users": [
                {
                  "id": 220,
                  "full_name": "test 1",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 1,
                    "name": "V rabote",
                    "code": "A"
                  },
                  "position": {
                    "id": 11,
                    "name": "Bosh mutaxassis",
                    "code": "9"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
                  "is_selected": true,
                  "favourite_id": 37,
                  "leave_end_date": null
                },
              ],
              "children": []
            }
          ]
        },
        {
          "id": 33,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "666 - 111",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": [
            {
              "id": 11,
              "name": "Dep name 1",
              "condition": "P",
              "users": [
                {
                  "id": 220,
                  "full_name": "test 2",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 1,
                    "name": "V rabote",
                    "code": "A"
                  },
                  "position": {
                    "id": 11,
                    "name": "Bosh mutaxassis",
                    "code": "9"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
                  "is_selected": true,
                  "favourite_id": 37,
                  "leave_end_date": null
                },
              ],
              "children": []
            }
          ]
        },
        {
          "id": 33,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "777 - 111",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": [
            {
              "id": 11,
              "name": "Dep name 1",
              "condition": "P",
              "users": [
                {
                  "id": 220,
                  "full_name": "test 3",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 1,
                    "name": "V rabote",
                    "code": "A"
                  },
                  "position": {
                    "id": 11,
                    "name": "Bosh mutaxassis",
                    "code": "9"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
                  "is_selected": true,
                  "favourite_id": 37,
                  "leave_end_date": null
                },
              ],
              "children": []
            }
          ]
        },
        {
          "id": 33,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "888 - 111",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 33,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "999 - 111",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "department": {
                "id": 11,
                "name": "Dep name 1"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
      ]
    },
    {
      "id": 11,
      "name": "Dep name 2",
      "condition": "P",
      "users": [
        {
          "id": 220,
          "full_name": "222",
          "cisco": null,
          "color": "#FF9800",
          "email": null,
          "status": {
            "id": 1,
            "name": "V rabote",
            "code": "A"
          },
          "position": {
            "id": 11,
            "name": "Bosh mutaxassis",
            "code": "9"
          },
          "top_level_department": {
            "id": 11,
            "name": "Dep name 2"
          },
          "department": {
            "id": 11,
            "name": "Dep name 2"
          },
          "company": {
            "id": 16,
            "name": "Bosh ofis"
          },
          "avatar": null,
          "mobile_number": null,
          "room_number": null,
          "floor": null,
          "work_address": null,
          "phone_2": null,
          "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
          "is_selected": true,
          "favourite_id": 37,
          "leave_end_date": null
        },
      ],
      "children": [
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "111 - 222",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 2"
              },
              "department": {
                "id": 11,
                "name": "Dep name 2"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 33,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "222 - 222",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 2"
              },
              "department": {
                "id": 11,
                "name": "Dep name 2"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": [
            {
              "id": 32,
              "name": "BBBB Malumotlar markazi bolasi",
              "condition": "A",
              "users": [
                {
                  "id": 17,
                  "full_name": "111 - 111",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 2,
                    "name": "В отпуске",
                    "code": "OT"
                  },
                  "position": {
                    "id": 7,
                    "name": "Departament direktori oʻrinbosari",
                    "code": "5"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                  "is_selected": true,
                  "favourite_id": 39,
                  "leave_end_date": null
                },
              ],
              "children": [
                {
                  "id": 33,
                  "name": "BBBB Malumotlar markazi bolasi",
                  "condition": "A",
                  "users": [
                    {
                      "id": 17,
                      "full_name": "111 - 111 - 111",
                      "cisco": null,
                      "color": "#FF9800",
                      "email": null,
                      "status": {
                        "id": 2,
                        "name": "В отпуске",
                        "code": "OT"
                      },
                      "position": {
                        "id": 7,
                        "name": "Departament direktori oʻrinbosari",
                        "code": "5"
                      },
                      "top_level_department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "company": {
                        "id": 16,
                        "name": "Bosh ofis"
                      },
                      "avatar": null,
                      "mobile_number": null,
                      "room_number": null,
                      "floor": null,
                      "work_address": null,
                      "phone_2": null,
                      "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                      "is_selected": true,
                      "favourite_id": 39,
                      "leave_end_date": null
                    },
                  ],
                  "children": []
                }
              ]
            },
            {
              "id": 33,
              "name": "BBBB Malumotlar markazi bolasi",
              "condition": "A",
              "users": [
                {
                  "id": 17,
                  "full_name": "222 - 111",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 2,
                    "name": "В отпуске",
                    "code": "OT"
                  },
                  "position": {
                    "id": 7,
                    "name": "Departament direktori oʻrinbosari",
                    "code": "5"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                  "is_selected": true,
                  "favourite_id": 39,
                  "leave_end_date": null
                },
              ],
              "children": [
                {
                  "id": 33,
                  "name": "BBBB Malumotlar markazi bolasi",
                  "condition": "A",
                  "users": [
                    {
                      "id": 17,
                      "full_name": "111 - 222 - 111",
                      "cisco": null,
                      "color": "#FF9800",
                      "email": null,
                      "status": {
                        "id": 2,
                        "name": "В отпуске",
                        "code": "OT"
                      },
                      "position": {
                        "id": 7,
                        "name": "Departament direktori oʻrinbosari",
                        "code": "5"
                      },
                      "top_level_department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "company": {
                        "id": 16,
                        "name": "Bosh ofis"
                      },
                      "avatar": null,
                      "mobile_number": null,
                      "room_number": null,
                      "floor": null,
                      "work_address": null,
                      "phone_2": null,
                      "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                      "is_selected": true,
                      "favourite_id": 39,
                      "leave_end_date": null
                    },
                  ],
                  "children": []
                }
              ]
            },
            {
              "id": 33,
              "name": "BBBB Malumotlar markazi bolasi",
              "condition": "A",
              "users": [
                {
                  "id": 17,
                  "full_name": "333 - 111",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 2,
                    "name": "В отпуске",
                    "code": "OT"
                  },
                  "position": {
                    "id": 7,
                    "name": "Departament direktori oʻrinbosari",
                    "code": "5"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                  "is_selected": true,
                  "favourite_id": 39,
                  "leave_end_date": null
                },
              ],
              "children": [
                {
                  "id": 33,
                  "name": "BBBB Malumotlar markazi bolasi",
                  "condition": "A",
                  "users": [
                    {
                      "id": 17,
                      "full_name": "111 - 333 - 111",
                      "cisco": null,
                      "color": "#FF9800",
                      "email": null,
                      "status": {
                        "id": 2,
                        "name": "В отпуске",
                        "code": "OT"
                      },
                      "position": {
                        "id": 7,
                        "name": "Departament direktori oʻrinbosari",
                        "code": "5"
                      },
                      "top_level_department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "company": {
                        "id": 16,
                        "name": "Bosh ofis"
                      },
                      "avatar": null,
                      "mobile_number": null,
                      "room_number": null,
                      "floor": null,
                      "work_address": null,
                      "phone_2": null,
                      "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                      "is_selected": true,
                      "favourite_id": 39,
                      "leave_end_date": null
                    },
                  ],
                  "children": []
                }
              ]
            },
            {
              "id": 33,
              "name": "BBBB Malumotlar markazi bolasi",
              "condition": "A",
              "users": [
                {
                  "id": 17,
                  "full_name": "444 - 111",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 2,
                    "name": "В отпуске",
                    "code": "OT"
                  },
                  "position": {
                    "id": 7,
                    "name": "Departament direktori oʻrinbosari",
                    "code": "5"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                  "is_selected": true,
                  "favourite_id": 39,
                  "leave_end_date": null
                },
              ],
              "children": [
                {
                  "id": 33,
                  "name": "BBBB Malumotlar markazi bolasi",
                  "condition": "A",
                  "users": [
                    {
                      "id": 17,
                      "full_name": "111 - 444 - 111",
                      "cisco": null,
                      "color": "#FF9800",
                      "email": null,
                      "status": {
                        "id": 2,
                        "name": "В отпуске",
                        "code": "OT"
                      },
                      "position": {
                        "id": 7,
                        "name": "Departament direktori oʻrinbosari",
                        "code": "5"
                      },
                      "top_level_department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "company": {
                        "id": 16,
                        "name": "Bosh ofis"
                      },
                      "avatar": null,
                      "mobile_number": null,
                      "room_number": null,
                      "floor": null,
                      "work_address": null,
                      "phone_2": null,
                      "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                      "is_selected": true,
                      "favourite_id": 39,
                      "leave_end_date": null
                    },
                  ],
                  "children": []
                }
              ]
            },
            {
              "id": 33,
              "name": "BBBB Malumotlar markazi bolasi",
              "condition": "A",
              "users": [
                {
                  "id": 17,
                  "full_name": "555 - 111",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 2,
                    "name": "В отпуске",
                    "code": "OT"
                  },
                  "position": {
                    "id": 7,
                    "name": "Departament direktori oʻrinbosari",
                    "code": "5"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                  "is_selected": true,
                  "favourite_id": 39,
                  "leave_end_date": null
                },
              ],
              "children": [
                {
                  "id": 11,
                  "name": "Dep name 1",
                  "condition": "P",
                  "users": [
                    {
                      "id": 220,
                      "full_name": "test 1",
                      "cisco": null,
                      "color": "#FF9800",
                      "email": null,
                      "status": {
                        "id": 1,
                        "name": "V rabote",
                        "code": "A"
                      },
                      "position": {
                        "id": 11,
                        "name": "Bosh mutaxassis",
                        "code": "9"
                      },
                      "top_level_department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "company": {
                        "id": 16,
                        "name": "Bosh ofis"
                      },
                      "avatar": null,
                      "mobile_number": null,
                      "room_number": null,
                      "floor": null,
                      "work_address": null,
                      "phone_2": null,
                      "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
                      "is_selected": true,
                      "favourite_id": 37,
                      "leave_end_date": null
                    },
                  ],
                  "children": []
                }
              ]
            },
            {
              "id": 33,
              "name": "BBBB Malumotlar markazi bolasi",
              "condition": "A",
              "users": [
                {
                  "id": 17,
                  "full_name": "666 - 111",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 2,
                    "name": "В отпуске",
                    "code": "OT"
                  },
                  "position": {
                    "id": 7,
                    "name": "Departament direktori oʻrinbosari",
                    "code": "5"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                  "is_selected": true,
                  "favourite_id": 39,
                  "leave_end_date": null
                },
              ],
              "children": [
                {
                  "id": 11,
                  "name": "Dep name 1",
                  "condition": "P",
                  "users": [
                    {
                      "id": 220,
                      "full_name": "test 2",
                      "cisco": null,
                      "color": "#FF9800",
                      "email": null,
                      "status": {
                        "id": 1,
                        "name": "V rabote",
                        "code": "A"
                      },
                      "position": {
                        "id": 11,
                        "name": "Bosh mutaxassis",
                        "code": "9"
                      },
                      "top_level_department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "company": {
                        "id": 16,
                        "name": "Bosh ofis"
                      },
                      "avatar": null,
                      "mobile_number": null,
                      "room_number": null,
                      "floor": null,
                      "work_address": null,
                      "phone_2": null,
                      "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
                      "is_selected": true,
                      "favourite_id": 37,
                      "leave_end_date": null
                    },
                  ],
                  "children": []
                }
              ]
            },
            {
              "id": 33,
              "name": "BBBB Malumotlar markazi bolasi",
              "condition": "A",
              "users": [
                {
                  "id": 17,
                  "full_name": "777 - 111",
                  "cisco": null,
                  "color": "#FF9800",
                  "email": null,
                  "status": {
                    "id": 2,
                    "name": "В отпуске",
                    "code": "OT"
                  },
                  "position": {
                    "id": 7,
                    "name": "Departament direktori oʻrinbosari",
                    "code": "5"
                  },
                  "top_level_department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "department": {
                    "id": 11,
                    "name": "Dep name 1"
                  },
                  "company": {
                    "id": 16,
                    "name": "Bosh ofis"
                  },
                  "avatar": null,
                  "mobile_number": null,
                  "room_number": null,
                  "floor": null,
                  "work_address": null,
                  "phone_2": null,
                  "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
                  "is_selected": true,
                  "favourite_id": 39,
                  "leave_end_date": null
                },
              ],
              "children": [
                {
                  "id": 11,
                  "name": "Dep name 1",
                  "condition": "P",
                  "users": [
                    {
                      "id": 220,
                      "full_name": "test 3",
                      "cisco": null,
                      "color": "#FF9800",
                      "email": null,
                      "status": {
                        "id": 1,
                        "name": "V rabote",
                        "code": "A"
                      },
                      "position": {
                        "id": 11,
                        "name": "Bosh mutaxassis",
                        "code": "9"
                      },
                      "top_level_department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "department": {
                        "id": 11,
                        "name": "Dep name 1"
                      },
                      "company": {
                        "id": 16,
                        "name": "Bosh ofis"
                      },
                      "avatar": null,
                      "mobile_number": null,
                      "room_number": null,
                      "floor": null,
                      "work_address": null,
                      "phone_2": null,
                      "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
                      "is_selected": true,
                      "favourite_id": 37,
                      "leave_end_date": null
                    },
                  ],
                  "children": []
                }
              ]
            },
          ]
        },
        {
          "id": 33,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "333 - 222",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 2"
              },
              "department": {
                "id": 11,
                "name": "Dep name 2"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 33,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "444 - 222",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 2"
              },
              "department": {
                "id": 11,
                "name": "Dep name 2"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        // {
        //   "id": 33,
        //   "name": "BBBB Malumotlar markazi bolasi",
        //   "condition": "A",
        //   "users": [
        //     {
        //       "id": 17,
        //       "full_name": "555 - 222",
        //       "cisco": null,
        //       "color": "#FF9800",
        //       "email": null,
        //       "status": {
        //         "id": 2,
        //         "name": "В отпуске",
        //         "code": "OT"
        //       },
        //       "position": {
        //         "id": 7,
        //         "name": "Departament direktori oʻrinbosari",
        //         "code": "5"
        //       },
        //       "top_level_department": {
        //         "id": 11,
        //         "name": "Dep name 2"
        //       },
        //       "department": {
        //         "id": 11,
        //         "name": "Dep name 2"
        //       },
        //       "company": {
        //         "id": 16,
        //         "name": "Bosh ofis"
        //       },
        //       "avatar": null,
        //       "mobile_number": null,
        //       "room_number": null,
        //       "floor": null,
        //       "work_address": null,
        //       "phone_2": null,
        //       "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
        //       "is_selected": true,
        //       "favourite_id": 39,
        //       "leave_end_date": null
        //     },
        //   ],
        //   "children": []
        // },
      ]
    },
    {
      "id": 11,
      "name": "Dep name 3",
      "condition": "P",
      "users": [
        {
          "id": 220,
          "full_name": "333",
          "cisco": null,
          "color": "#FF9800",
          "email": null,
          "status": {
            "id": 1,
            "name": "V rabote",
            "code": "A"
          },
          "position": {
            "id": 11,
            "name": "Bosh mutaxassis",
            "code": "9"
          },
          "top_level_department": {
            "id": 11,
            "name": "Dep name 3"
          },
          "department": {
            "id": 11,
            "name": "Dep name 3"
          },
          "company": {
            "id": 16,
            "name": "Bosh ofis"
          },
          "avatar": null,
          "mobile_number": null,
          "room_number": null,
          "floor": null,
          "work_address": null,
          "phone_2": null,
          "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
          "is_selected": true,
          "favourite_id": 37,
          "leave_end_date": null
        }
      ],
      "children": [
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "111 - 333",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 3"
              },
              "department": {
                "id": 11,
                "name": "Dep name 3"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "222 - 333",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 3"
              },
              "department": {
                "id": 11,
                "name": "Dep name 3"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "333 - 333",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 3"
              },
              "department": {
                "id": 11,
                "name": "Dep name 3"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "444 - 333",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 3"
              },
              "department": {
                "id": 11,
                "name": "Dep name 3"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "555 - 333",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 3"
              },
              "department": {
                "id": 11,
                "name": "Dep name 3"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
      ]
    },
    {
      "id": 12,
      "name": "Dep name 4",
      "condition": "P",
      "users": [
        {
          "id": 220,
          "full_name": "444",
          "cisco": null,
          "color": "#FF9800",
          "email": null,
          "status": {
            "id": 1,
            "name": "V rabote",
            "code": "A"
          },
          "position": {
            "id": 11,
            "name": "Bosh mutaxassis",
            "code": "9"
          },
          "top_level_department": {
            "id": 11,
            "name": "Dep name 4"
          },
          "department": {
            "id": 11,
            "name": "Dep name 4"
          },
          "company": {
            "id": 16,
            "name": "Bosh ofis"
          },
          "avatar": null,
          "mobile_number": null,
          "room_number": null,
          "floor": null,
          "work_address": null,
          "phone_2": null,
          "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
          "is_selected": true,
          "favourite_id": 37,
          "leave_end_date": null
        },
      ],
      "children": [
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "111 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "222 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "333 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "444 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "555 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
      ]
    },
    {
      "id": 12,
      "name": "Dep name 4",
      "condition": "P",
      "users": [
        {
          "id": 220,
          "full_name": "555",
          "cisco": null,
          "color": "#FF9800",
          "email": null,
          "status": {
            "id": 1,
            "name": "V rabote",
            "code": "A"
          },
          "position": {
            "id": 11,
            "name": "Bosh mutaxassis",
            "code": "9"
          },
          "top_level_department": {
            "id": 11,
            "name": "Dep name 4"
          },
          "department": {
            "id": 11,
            "name": "Dep name 4"
          },
          "company": {
            "id": 16,
            "name": "Bosh ofis"
          },
          "avatar": null,
          "mobile_number": null,
          "room_number": null,
          "floor": null,
          "work_address": null,
          "phone_2": null,
          "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
          "is_selected": true,
          "favourite_id": 37,
          "leave_end_date": null
        },
      ],
      "children": [
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "111 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "222 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "333 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "444 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "555 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
      ]
    },
    {
      "id": 12,
      "name": "Dep name 4",
      "condition": "P",
      "users": [
        {
          "id": 220,
          "full_name": "666",
          "cisco": null,
          "color": "#FF9800",
          "email": null,
          "status": {
            "id": 1,
            "name": "V rabote",
            "code": "A"
          },
          "position": {
            "id": 11,
            "name": "Bosh mutaxassis",
            "code": "9"
          },
          "top_level_department": {
            "id": 11,
            "name": "Dep name 4"
          },
          "department": {
            "id": 11,
            "name": "Dep name 4"
          },
          "company": {
            "id": 16,
            "name": "Bosh ofis"
          },
          "avatar": null,
          "mobile_number": null,
          "room_number": null,
          "floor": null,
          "work_address": null,
          "phone_2": null,
          "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
          "is_selected": true,
          "favourite_id": 37,
          "leave_end_date": null
        },
      ],
      "children": [
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "111 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "222 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "333 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "444 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "555 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
      ]
    },
    {
      "id": 12,
      "name": "Dep name 4",
      "condition": "P",
      "users": [
        {
          "id": 220,
          "full_name": "777",
          "cisco": null,
          "color": "#FF9800",
          "email": null,
          "status": {
            "id": 1,
            "name": "V rabote",
            "code": "A"
          },
          "position": {
            "id": 11,
            "name": "Bosh mutaxassis",
            "code": "9"
          },
          "top_level_department": {
            "id": 11,
            "name": "Dep name 4"
          },
          "department": {
            "id": 11,
            "name": "Dep name 4"
          },
          "company": {
            "id": 16,
            "name": "Bosh ofis"
          },
          "avatar": null,
          "mobile_number": null,
          "room_number": null,
          "floor": null,
          "work_address": null,
          "phone_2": null,
          "private_chat_id": "8436e06b-7e38-47ec-8882-a09fb17509d8",
          "is_selected": true,
          "favourite_id": 37,
          "leave_end_date": null
        },
      ],
      "children": [
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "AAAA 111 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "222 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "333 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "444 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
        {
          "id": 32,
          "name": "BBBB Malumotlar markazi bolasi",
          "condition": "A",
          "users": [
            {
              "id": 17,
              "full_name": "555 - 444",
              "cisco": null,
              "color": "#FF9800",
              "email": null,
              "status": {
                "id": 2,
                "name": "В отпуске",
                "code": "OT"
              },
              "position": {
                "id": 7,
                "name": "Departament direktori oʻrinbosari",
                "code": "5"
              },
              "top_level_department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "department": {
                "id": 11,
                "name": "Dep name 4"
              },
              "company": {
                "id": 16,
                "name": "Bosh ofis"
              },
              "avatar": null,
              "mobile_number": null,
              "room_number": null,
              "floor": null,
              "work_address": null,
              "phone_2": null,
              "private_chat_id": "23db5344-9230-4d00-b938-e7346763627a",
              "is_selected": true,
              "favourite_id": 39,
              "leave_end_date": null
            },
          ],
          "children": []
        },
      ]
    },
  ]
}])
</script>

<template>
  <div class="tree-type-view">
    <template v-for="item in value" :key="item.id">
      <template v-for="(user, index) in item.users" :key="item.id">
        <div class="flex justify-center">
          <div class="max-w-[445px] w-full">
            <card-item
              :item="user"
              :index="index"
            />
          </div>
        </div>
      </template>

      <template v-if="item.children && item.children.length">
        <div class="-mt-2.5">
          <collapse-count :count="item.children.length" @emit:count="(val) => toggle = val" />
        </div>

        <collapse-list :toggle="toggle" :items="item.children" />
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>
