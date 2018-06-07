#include <iostream>
#include <string>
#include <vector>
#include <fstream>

using namespace std;

class Calculator{

public:
    vector quadratic();

};

vector quadratic(){
    vector result;

}

int main() {
    /* you can type  'using namespace std;' to get rid of the std:: above main*/
    std::cout << "Hello, World!" << std::endl;

    string input;

    getline(cin, input);

    cout << "the input " << input <<endl;

    vector <int> firstVector(10);

    int firstArray[5] = {4,13,14,24,23};

    /* only copy the first 3 elements of the array */
    firstVector.insert(firstVector.begin(), firstArray,firstArray+3);

    firstVector.insert(firstVector.begin()+5,44);




    int addnumbers()

    return 0;
}