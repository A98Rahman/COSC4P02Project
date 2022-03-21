import unittest
import time
import pandas as pd
import json
from selenium import webdriver
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

test_url = "https://brocku.ca/guides-and-timetables/timetables/?session=FW&type=UG&level=Year1&program=ACTG"

# https://brocku.ca/guides-and-timetables/timetables/?session=FW&type=UG&level=Year1&program=ADED
# https://brocku.ca/guides-and-timetables/timetables/?session=FW&type=UG&level=Year1&program=ACTG
before_XPath = "//html/body/div/div[8]/div[2]/div/div[2]/div/div[3]/div/div/div/div/div/div/div[2]/div[4]/table/tbody/tr["
#   MKTG         /html/body/div/div[8]/div[2]/div/div[2]/div/div[3]/div/div/div/div/div/div/div[2]/div[4]/table/tbody/tr[1]
#   ACTG         /html/body/div/div[8]/div[2]/div/div[2]/div/div[3]/div/div/div/div/div/div/div[2]/div[4]/table/tbody/tr[1]
aftertd_XPath = "]/td["
aftertr_XPath = "]"

# /html/body/div/div[8]/div[2]/div/div[2]/div/div[3]/div/div/div/div/div/div/div[2]/div[4]/table/tbody/tr[5]/td[8]/div/div[1]/p[4] prereq
# /html/body/div/div[8]/div[2]/div/div[2]/div/div[3]/div/div/div/div/div/div/div[2]/div[4]/table/tbody/tr[5]/td[8]/div/div[2]/ul/li[5] inst

drop1_XPath = "/div/div[1]/p["  # remove end bracket
after1_XPath = "]"
# /html/body/div/div[8]/div[2]/div/div[2]/div/div[3]/div/div/div/div/div/div/div[2]/div[4]/table/tbody/tr[1]/td[8]/div/div[1]/p[4]
drop2_XPath = "/div/div[2]/ul/li["
after2_XPath = "]"


#
#
#
#
#


class WebTableTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome('/Users/anwarhashmi/Downloads/chromedriver')
        self.driver.maximize_window()

    def test_get_row_col_info_(self):
        driver = self.driver
        driver.get(test_url)

        #WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.XPATH, '//*[@id="7858101"]')))
        WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.XPATH, '//*[@id="7858101"]/td[8]/div/div[1]')))

        rows = len(driver.find_elements(By.XPATH,
                                        '.'
                                        '//html/body/div/div[8]/div[2]/div/div[2]/div/div[3]/div/div/div/div/div/div/div[2]/div[4]/table/tbody/tr'));
        # print (rows)
        columns = len(driver.find_elements(By.XPATH,
                                           '//html/body/div/div[8]/div[2]/div/div[2]/div/div[3]/div/div/div/div/div/div/div[2]/div[4]/table/tbody/tr[2]/td'));
        # print(columns)

        dict1 = dict.fromkeys(
            ['course_code', 'course_name', 'course_duration', 'course_days', 'course_time', 'course_format',
             'prerequisites', 'instructor', 'location'])

        for t_row in range(2, (rows + 1)):

            for t_column in range(8, (columns + 1)):  # 1
                FinalXPath = before_XPath + str(t_row) + aftertd_XPath + str(t_column) + aftertr_XPath
                cell_text = driver.find_element_by_xpath(FinalXPath).text

                temp_Path = FinalXPath + drop1_XPath + '1' + after1_XPath
                drop_text = driver.find_element_by_xpath(temp_Path).text
                # dict1["prerequisites"] = drop_text

                if t_column == 2:
                    dict1["course_code"] = cell_text
                    # dict1["prerequisites"] = drop_text1

                elif t_column == 3:
                    # course_name.append(cell_text)
                    dict1["course_name"] = cell_text

                elif t_column == 4:
                    # course_duration.append(cell_text)
                    dict1["course_duration"] = cell_text



                elif t_column == 5:
                    # course_days.append(cell_text)
                    dict1["course_days"] = cell_text

                elif t_column == 6:
                    # course_time.append(cell_text)
                    dict1["course_time"] = cell_text


                elif t_column == 7:

                    # course_format.append(cell_text)
                    dict1["course_format"] = cell_text


                # //html/body/div/div[8]/div[2]/div/div[2]/div/div[3]/div/div/div/div/div/div/div[2]/div[4]/table/tbody/tr[2]/td[8]/div/div[1]/p[4]
                # /html/body/div/div[8]/div[2]/div/div[2]/div/div[3]/div/div/div/div/div/div/div[2]/div[4]/table/tbody/tr[5]/td[8]/div/div[1]/p[4]
                elif t_column == 8:

                    # /html/body/div/div[8]/div[2]/div/div[2]/div/div[3]/div/div/div/div/div/div/div[2]/div[4]/table/tbody/tr[1]/td[8]/div/div[1]/p[1]

                    dict1["prerequisites"] = cell_text

                # //*[@id="7858101"]/td[8]/div

                with open('MKTGtest1.json', 'a+') as fp:
                    json.dump(dict1, fp)


if __name__ == "__main__":
    unittest.main()
